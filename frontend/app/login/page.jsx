'use client';
import { text } from '@/config/text';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [pending, setPending] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <main className="flex items-center justify-center bg-gradient-to-r from-white via-white to-sky-600 h-full">
      <div className="flex flex-items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center h-screen w-1/2 gap-2">
          <div className="flex flex-col items-center mb-3">
            <h1 className="text-3xl font-bold text-black ">{text.welcome}</h1>
            <h4 className="text-gray-400 pt-1 ">{text.signIn}</h4>
          </div>
          <div className="flex flex-col w-full gap-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <Button
                type="submit"
                className="mt-4 w-full"
                color="primary"
                isLoading={pending}
              >
                {text.signIn}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
