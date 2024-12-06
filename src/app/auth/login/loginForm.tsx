'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../../components/button';
import Swal from 'sweetalert2';

// 타입 정의
type Inputs = {
  userId: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('Form Submitted:', data);
    loginAlert('로그인 성공!', '환영합니다.', 'success');
    router.push('/'); // 로그인 후 이동할 경로
  };

  const loginAlert = (
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info',
  ) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: '확인',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-2'}>
      <input
        {...register('userId', { required: '아이디를 입력해주세요' })}
        type="text"
        placeholder="ID를 입력하세요"
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        className="border p-2 rounded"
        aria-invalid={
          isSubmitted ? (errors.password ? 'true' : 'false') : undefined
        }
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: {
            value: 6,
            message: '6자리 이상 비밀번호를 사용하세요',
          },
        })}
      />
      {errors.password && <small role="alert">{errors.password.message}</small>}
      <Button
        label="로그인"
        type="submit"
        className={'bg-blue-500 text-white p-2 rounded'}
      />
      <Button
        label="회원가입"
        type="button"
        href="/auth/join"
        className={'bg-blue-500 text-white p-2 rounded'}
      />
    </form>
  );
};
export default LoginForm;
