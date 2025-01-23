// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import bcrypt from "bcryptjs";
// import { prisma } from "../database";

// passport.use(
//     new LocalStrategy(
//       { usernameField: "email" },
//       async (email: string, password: string, done) => {
//         try {
//           const user = await prisma.user.findUnique({ where: { email } });
//           if (!user) {
//             return done(null, false, { message: "User not found" });
//           }

//           const isPasswordValid = await bcrypt.compare(password, user.password);
//           if (!isPasswordValid) {
//             return done(null, false, { message: "Incorrect password" });
//           }

//           return done(null, user)
//         } catch (error) {
//             return done(error)
//         }
//     }),
// );


