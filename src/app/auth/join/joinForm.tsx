'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../../components/button';
import DaumPostcode from 'react-daum-postcode';
import Swal from 'sweetalert2';

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
  const { register, handleSubmit } = useForm<FormInputs>();
  const [showPostcode, setShowPostcode] = useState(false);
  const handleComplete = (data: any) => {
    // DaumPostcode의 기본 데이터
    if (data.userSelectedType == 'J') setSelectedAddress(data.jibunAddress);
    else setSelectedAddress(data.address);
    // 클릭된 버튼에 따라 주소 저장

    setShowPostcode(false); // 모달 닫기
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('Form Submitted:', data);

    showAlert('회원가입 축하!', `환영합니다`, 'success');
    router.push('/'); // 성공 후 이동 경로
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
    <div className="max-w-md mx-auto  bg-white shadow-md rounded-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
        회원가입
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 아이디 */}
        <div>
          <label htmlFor="userId" className="block font-medium mb-1">
            아이디
          </label>
          <div className="flex gap-2">
            <input
              id="userId"
              type="text"
              placeholder="아이디를 입력하세요"
              {...register('userId', { required: '아이디를 입력해주세요.' })}
              className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              label="중복체크"
              onClick={() =>
                showAlert('중복체크!', '중복 체크 기능구현중입니다.', 'error')
              }
              className="bg-blue-500 hover:bg-blue-600"
            />
          </div>
        </div>

        {/* 비밀번호 */}
        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label htmlFor="confirmPassword" className="block font-medium mb-1">
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            {...register('confirmPassword', {
              required: '비밀번호 확인을 입력해주세요.',
            })}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 이름 */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            이름
          </label>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            {...register('userName', { required: '이름을 입력해주세요.' })}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
              {...register('address', { required: '주소를 입력해주세요.' })}
              className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedAddress} // 상태를 value로 바인딩
              readOnly // 읽기 전용으로 설정
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
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 제출 버튼 */}
        <Button
          label="회원가입"
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
        {/* 링크 이동 */}
        <Button
          label="돌아가기"
          type="button"
          className="w-full bg-blue-500 hover:bg-blue-600"
          href="/auth/login"
        />
      </form>
    </div>
  );
};
