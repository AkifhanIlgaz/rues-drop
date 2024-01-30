import { text } from '@/config/text';
import { Button } from '@nextui-org/button';
import { GoogleLogo } from '../icons';

export default function SignInWithGoogleButton() {
  return (
    <Button
      className="text-sm flex gap-2 shadow-md"
      variant="ghost"
      startContent={<GoogleLogo size={20} />}
    >
      {text.signInWithGoogle}
    </Button>
  );
}
