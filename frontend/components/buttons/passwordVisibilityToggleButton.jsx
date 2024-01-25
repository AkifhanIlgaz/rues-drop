import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';

export default function PasswordVisibilityToggleButton({
  isPasswordVisible,
  togglePasswordVisibility,
}) {
  return (
    <Button
      type="button"
      isIconOnly
      onClick={togglePasswordVisibility}
      className="bg-transparent focus:outline-none w-6 h-6"
      disableAnimation
    >
      {isPasswordVisible ? (
        <EyeSlashIcon className="text-2xl text-default-400 w-full h-full"></EyeSlashIcon>
      ) : (
        <EyeIcon className="text-2xl text-default-400 w-full h-full"></EyeIcon>
      )}
    </Button>
  );
}
