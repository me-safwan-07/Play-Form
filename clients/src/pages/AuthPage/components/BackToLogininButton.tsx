import { Button } from "@/components/ui/Button"

export const BackToLoginButton = () => {
    return (
        <Button variant="secondary" href="/auth/login" className="w-full justify-center">
            Login
        </Button>
    );
};