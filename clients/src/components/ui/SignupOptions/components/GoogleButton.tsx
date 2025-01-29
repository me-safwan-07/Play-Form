import Button from "../../Button";
import { GoogleIcon } from "../../icons/GoogleIcon";

export const GoogleButton = ({
  text = "Continue with Google",
  handleGoogleSignIn,
  // inviteUrl,
}: {
  text?: string;
  handleGoogleSignIn?: () => void;
  inviteUrl?: string | null;
}) => {

  return (
    <Button
      type="button"
      EndIcon={GoogleIcon}
      startIconClassName="ml-3"
      onClick={handleGoogleSignIn}
      variant="secondary"
      className="w-full justify-center"
    >
      {text}
    </Button>
  );
};
