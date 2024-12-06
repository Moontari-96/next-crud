'use client';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  const goToLogin = () => {
    router.push('/auth/login');
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>Hello My Next</div>
      <button
        onClick={goToLogin}
        className="bg-blue-500 text-white p-2 rounded"
      >
        로그인
      </button>
    </div>
  );
}
