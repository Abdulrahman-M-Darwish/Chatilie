'use client';
import { useFormik } from 'formik';
import { signupFormSchemaValidator } from '@/schemas/forms';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/features';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Link,
  Radio,
  Select,
} from 'react-daisyui';
import { SIGNUP } from './operations';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import Image from 'next/image';
import React, { useState } from 'react';
import { Gender } from '@/types';
import { ErroDialog } from '../components';

const year = new Date().getFullYear();

const Signup: React.FC = () => {
  const [signup, { loading, error }] = useMutation(SIGNUP);
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    validationSchema: signupFormSchemaValidator,
    initialValues: {
      email: '',
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: 'gender',
      year: 'year',
      month: 'month',
      day: 'day',
      conditions: '',
    },
    onSubmit: async ({
      email,
      name,
      password,
      day,
      year,
      month,
      username,
      gender,
    }) => {
      const birthDate = new Date(
        `${year} ${month} ${day}`,
      ).toISOString() as unknown as Date;
      const { data } = await signup({
        variables: {
          signupInput: {
            email,
            name,
            password,
            birthDate,
            username,
            gender,
          },
        },
      });
      dispatch(setUser(data.signup));
      formik.resetForm();
      replace('/');
    },
  });
  const [showPassword, setShowPassword] = useState(false);
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
        <Form.Label htmlFor="name" title="Name" />
        <Input
          type="text"
          id="name"
          placeholder="Name"
          className="border-x-0 border-t-0 rounded-none focus:outline-none"
          {...formik.getFieldProps('name')}
        />
        <ErroDialog
          isTouched={formik.touched.name}
          errorMessage={formik.errors.name}
        />
      </div>
      <div className="form-control">
        <Form.Label htmlFor="username" title="Username" />
        <Input
          type="text"
          id="username"
          placeholder="Username"
          className="border-x-0 border-t-0 rounded-none focus:outline-none"
          {...formik.getFieldProps('username')}
        />
        <ErroDialog
          isTouched={formik.touched.username}
          errorMessage={formik.errors.username}
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
      <div className="form-control">
        <Form.Label title="Birth Date" />
        <div className="flex">
          <Select
            id="year"
            className="flex-1 rounded-none rounded-l-box"
            {...formik.getFieldProps('year')}
          >
            <option>year</option>
            {[...Array(80)].map((e, i) => (
              <option key={`year-${i}`} value={year - i}>
                {year - i}
              </option>
            ))}
          </Select>
          <Select
            id="month"
            className="flex-1 rounded-none"
            {...formik.getFieldProps('month')}
          >
            <option>month</option>
            {[...Array(12)].map((e, i) => (
              <option key={`month-${i}`} value={12 - i}>
                {12 - i}
              </option>
            ))}
          </Select>
          <Select
            id="day"
            className="flex-1 rounded-none rounded-r-box"
            {...formik.getFieldProps('day')}
          >
            <option>day</option>
            {[...Array(31)].map((e, i) => (
              <option key={`day-${i}`} value={31 - i}>
                {31 - i}
              </option>
            ))}
          </Select>
        </div>
        <ErroDialog
          isTouched={
            formik.touched.year && formik.touched.month && formik.touched.day
          }
          errorMessage={
            formik.errors.year && formik.errors.month && formik.errors.day
              ? 'when you born'
              : undefined
          }
        />
      </div>
      <div className="form-control">
        <div className="flex flex-row justify-between items-center my-2">
          <Form.Label title="No Terms And Conditions" htmlFor="conditions" />
          <Checkbox id="conditions" {...formik.getFieldProps('conditions')} />
        </div>
        <ErroDialog
          isTouched={formik.touched.conditions}
          errorMessage={formik.errors.conditions}
        />
      </div>
      <div className="form-control">
        <div className="flex flex-row gap-2 font-bold">
          <Form.Label title="Male" className="bg-base-200 shadow p-4 flex-1">
            <Radio
              {...formik.getFieldProps('gender')}
              name="gender"
              value={Gender.MALE}
            />
          </Form.Label>
          <Form.Label title="Female" className="bg-base-200 shadow p-4 flex-1">
            <Radio
              {...formik.getFieldProps('gender')}
              name="gender"
              value={Gender.FEMALE}
            />
          </Form.Label>
        </div>
        <ErroDialog
          isTouched={formik.touched.gender}
          errorMessage={formik.errors.gender}
        />
      </div>
      <p className="mt-2 ml-2">
        Got Acc
        <Link
          href="/login"
          className="underline hover:decoration-wavy mx-2 text-info"
        >
          Login
        </Link>
      </p>
      <Button
        type="submit"
        color="primary"
        className="w-full mt-4"
        loading={loading}
        disabled={loading}
      >
        Let&#39;s Go
      </Button>
      <ErroDialog isTouched={true} errorMessage={error?.message} />
    </form>
  );
};

export default Signup;
