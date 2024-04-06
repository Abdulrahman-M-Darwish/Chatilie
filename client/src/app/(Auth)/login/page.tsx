'use client';
import Link from 'next/link';
import { useFormik } from 'formik';
import { setUser } from '@/store/features';
import { useAppDispatch } from '@/store';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { Input, Form, Button } from 'react-daisyui';
import Image from 'next/image';
import { ErroDialog } from '../components';
import { useState } from 'react';
import { LOGIN } from './operations';
import { LuEye, LuEyeOff } from 'react-icons/lu';

const Login: React.FC = () => {
  const [login, { error }] = useMutation(LOGIN);
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }) => {
      const { data } = await login({
        variables: { loginInput: { email, password } },
      });
      dispatch(setUser(data.login));
      formik.resetForm();
      replace('/');
    },
  });
  return (
    <form className="max-w-xl w-full my-8" onSubmit={formik.handleSubmit}>
      <div>
        <Image
          src="/logo.svg"
          width={500}
          height={500}
          alt="my cool app logo"
          className="w-full"
        />
      </div>
      <div className="form-control">
        <Form.Label htmlFor="email" title="Email" />
        <Input
          type="text"
          id="email"
          placeholder="Email"
          className="border-x-0 border-t-0 rounded-none focus:outline-none"
          {...formik.getFieldProps('email')}
        />
        <ErroDialog
          isTouched={formik.touched.email}
          errorMessage={formik.errors.email}
        />
      </div>
      <div className="form-control">
        <Form.Label htmlFor="password" title="Password" />
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            className="border-x-0 border-t-0 rounded-none focus:outline-none w-full"
            {...formik.getFieldProps('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute top-1/2 -translate-y-1/2 right-4"
          >
            {showPassword ? (
              <LuEyeOff className="text-xl pointer-events-none" />
            ) : (
              <LuEye className="text-xl pointer-events-none" />
            )}
          </button>
        </div>
        <ErroDialog
          isTouched={formik.touched.password}
          errorMessage={formik.errors.password}
        />
      </div>
      <p className="mt-2 ml-2">
        No Acc
        <Link
          href="/signup"
          className="underline hover:decoration-wavy mx-2 text-info"
        >
          Sign Up
        </Link>
      </p>
      <Button type="submit" color="primary" className="w-full mt-4">
        Let&#39;s Go
      </Button>
      <ErroDialog isTouched={true} errorMessage={error?.message} />
    </form>
  );
};

export default Login;
