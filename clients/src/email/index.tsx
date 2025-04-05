import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { MAIL_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_SECURE_ENABLED, SMTP_USER, WEBAPP_URL } from "@/lib/constants";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { getToken } from "@/api/authAPI";
import { EmailTemplate } from "./components/general/email-template";
import { VerificationEmail } from "./components/auth/verification-email";

export const IS_SMTP_CONFIGURED = Boolean(SMTP_HOST && SMTP_PORT);

interface SendEmailDataProps {
    to: string;
    replyTo?: string;
    subject: string;
    text?: string;
    html: string;
}

interface TEmailUser {
    id: string;
    email: string;
}

export const sendEmail = async (emailData: SendEmailDataProps) => {
    if (!IS_SMTP_CONFIGURED) return;

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE_ENABLED, // true for 465, false for other ports
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD,
        },
        logger: true,
        debug: true,
    } as SMTPTransport.Options);

    const emailDefaults = {
        from: `PlayForm <${MAIL_FROM ?? "noreply@playform.com"}>`,
    };
    await transporter.sendMail({ ...emailDefaults, ...emailData });
};

export const sendVerificationEmail = async (user: TEmailUser) => {
    const token = await getToken(user.id, user.email, "1d");
    const verifyLink = `${WEBAPP_URL}/auth/verify?token=${encodeURIComponent(token)}`;
    const verificationRequestLink = `${WEBAPP_URL}/auth/verification-requested?email=${encodeURIComponent(user.email)}`;
    const htmlContent = await render(EmailTemplate({ content: VerificationEmail({ verificationRequestLink, verifyLink})} ));
    await sendEmail({
        to: user.email,
        subject: "Please verify your email to use PlayForm",
        html: htmlContent,
    });
};

