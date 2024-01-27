'use client';
import { GoogleLogo } from '@/components/icons';
import PasswordInput from '@/components/inputs/passwordInput';
import TextInput from '@/components/inputs/textInput';
import { label } from '@/config/labels';
import { link } from '@/config/links';
import { text } from '@/config/text';
import { Button, Link } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [pending, setPending] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <main className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center h-screen w-1/4 gap-2">
        <div className="flex flex-col items-center mb-3">
          <h1 className="text-3xl font-bold text-black ">{text.welcome}</h1>
        </div>
        <div className="flex flex-col w-full gap-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <TextInput
              label={label.email}
              errors={errors}
              register={register}
              required={true}
            />

            <PasswordInput
              errors={errors}
              register={register}
              label={label.password}
              required={true}
            />
            <PasswordInput
              errors={errors}
              register={register}
              label={label.passwordConfirm}
              required={true}
            />

            <Button
              type="submit"
              className="mt-4 w-full"
              color="primary"
              isLoading={pending}
            >
              {text.signUp}
            </Button>

            <div className="flex items-center justify-center text-small gap-2 mt-2">
              <span className="text-default-400">
                {text.alreadyHaveAccount}
              </span>
              <Link size="sm" href={link.signIn}>
                {text.signIn}
              </Link>
            </div>

            <GoogleLogo />
          </form>
        </div>
      </div>
    </main>
  );
}
