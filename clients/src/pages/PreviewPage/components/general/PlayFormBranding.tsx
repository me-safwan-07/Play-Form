export const PlayFormBranding = () => {
    return (
        <a
            href="http://localhost:5173?utm_source=form_branding"
            target="_blank"
            tabIndex={-1}
            className="my-2 flex justify-center"
        >
            <p className="text-slate-400 text-xs">
                Powered by{" "}
                <b>
                    <span className="text-slate-500 hover:text-slate-400">PlayForm</span>
                </b>
            </p>

        </a>

    )
}