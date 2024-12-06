'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../../components/button';
import DaumPostcode from 'react-daum-postcode';
import Swal from 'sweetalert2';
import url from '../../../config/config';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // 눈 아이콘
import axios from 'axios';

type FormInputs = {
  userId: string;
  password: string;
  confirmPassword: string;
  userName: string;
  address: string;
  detailAddress: string;
};

export const JoinForm = () => {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState(''); // 선택된 주소 상태
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const [showPostcode, setShowPostcode] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 여부
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 표시 여부

  // 주소 찾기 완료 이벤트
  const handleComplete = (data: any) => {
    if (data.userSelectedType == 'J') setSelectedAddress(data.jibunAddress);
    else setSelectedAddress(data.address);
    setShowPostcode(false); // 모달 닫기
  };

  // 유효성 검사 시 비밀번호 확인
  const password = watch('password'); // 현재 입력된 비밀번호
  const confirmPassword = watch('confirmPassword');

  // 회원가입 요청
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const fullAddress = `${selectedAddress} ${data.detailAddress}`; // 주소 합치기
    const submitData = {
      userId: data.userId,
      password: data.password,
      userName: data.userName,
      address: fullAddress,
    };

    try {
      await axios.post(`${url}/api/join`, submitData);
      showAlert('회원가입 성공!', `환영합니다, ${data.userName}!`, 'success');
      router.push('/'); // 성공 후 이동
    } catch (error) {
      showAlert('회원가입 실패', '서버 에러가 발생했습니다.', 'error');
    }
  };

  const showAlert = (
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
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
        회원가입
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 아이디 */}
        <div>
          <label htmlFor="userId" className="block font-medium mb-1">
            아이디
          </label>
          <input
            id="userId"
            type="text"
            placeholder="아이디를 입력하세요"
            {...register('userId', { required: '아이디를 입력해주세요.' })}
            className={`w-full border rounded p-2 focus:outline-none ${
              errors.userId ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.userId && (
            <span className="text-red-500 text-sm">
              {errors.userId.message}
            </span>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            비밀번호
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
              className={`w-full border rounded p-2 focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="text-gray-500" size={20} />
              ) : (
                <AiFillEye className="text-gray-500" size={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label htmlFor="confirmPassword" className="block font-medium mb-1">
            비밀번호 확인
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="비밀번호를 다시 입력하세요"
              {...register('confirmPassword', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: (value) =>
                  value === password || '비밀번호가 일치하지 않습니다.',
              })}
              className={`w-full border rounded p-2 focus:outline-none ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="text-gray-500" size={20} />
              ) : (
                <AiFillEye className="text-gray-500" size={20} />
              )}{' '}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* 이름 */}
        <div>
          <label htmlFor="userName" className="block font-medium mb-1">
            이름
          </label>
          <input
            id="userName"
            type="text"
            placeholder="이름을 입력하세요"
            {...register('userName', { required: '이름을 입력해주세요.' })}
            className={`w-full border rounded p-2 focus:outline-none ${
              errors.userName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.userName && (
            <span className="text-red-500 text-sm">
              {errors.userName.message}
            </span>
          )}
        </div>

        {/* 주소 */}
        <div>
          <label htmlFor="address" className="block font-medium mb-1">
            주소
          </label>
          <div className="flex gap-2">
            <input
              id="address"
              type="text"
              placeholder="주소를 검색하세요"
              className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedAddress}
              readOnly
            />
            <Button
              label="주소찾기"
              onClick={() => setShowPostcode(true)}
              className="bg-blue-500 hover:bg-blue-600"
            />
            {showPostcode && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded shadow-lg w-96">
                  <DaumPostcode onComplete={handleComplete} />
                  <button
                    onClick={() => setShowPostcode(false)}
                    className="bg-red-500 text-white p-2 rounded mt-2 w-full"
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 상세주소 */}
        <div>
          <label htmlFor="detailAddress" className="block font-medium mb-1">
            상세주소
          </label>
          <input
            id="detailAddress"
            type="text"
            placeholder="상세주소를 입력하세요"
            {...register('detailAddress', {
              required: '상세주소를 입력해주세요.',
            })}
            className={`w-full border rounded p-2 focus:outline-none ${
              errors.detailAddress ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.detailAddress && (
            <span className="text-red-500 text-sm">
              {errors.detailAddress.message}
            </span>
          )}
        </div>

        {/* 제출 버튼 */}
        <Button
          label="회원가입"
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </div>
  );
};
