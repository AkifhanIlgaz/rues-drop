import { generateError } from '@/utils/errors';
import { Input } from '@nextui-org/react';
import { useState } from 'react';
import PasswordVisibilityToggleButton from '../buttons/passwordVisibilityToggleButton';
import { Label } from '../label';

export default function PasswordInput({ register, errors, label, required }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col gap-1">
      <Label label={label.title} isRequired={required}></Label>
      <Input
        color="primary"
        type={isPasswordVisible ? 'text' : 'password'}
        endContent={
          <PasswordVisibilityToggleButton
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        }
        placeholder={label.title}
        labelPlacement="outside"
        variant="bordered"
        onPaste={(e) => {
          e.preventDefault();
        }}
        errorMessage={
          errors[label.key] && generateError(label.key, errors[label.key])
        }
        {...register(label.key, {
          required: true,
          minLength: 6,
        })}
      ></Input>
    </div>
  );
}
