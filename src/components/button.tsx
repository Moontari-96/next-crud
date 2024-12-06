'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type ButtonProps = {
  label: string; // 버튼 텍스트
  onClick?: () => void; // 클릭 이벤트 핸들러
  type?: 'button' | 'submit'; // 버튼 타입 (기본값: "button")
  href?: string; // 링크 이동 경로 (옵션)
  className?: string; // 추가적인 CSS 클래스
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  href,
  className = '',
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href); // 링크 이동
    } else if (onClick) {
      onClick(); // 사용자 정의 클릭 핸들러 호출
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`bg-blue-500 text-white p-2 rounded ${className}`}
    >
      {label}
    </button>
  );
};
