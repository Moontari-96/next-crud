import LoginForm from './loginForm';

export default function Login() {
  return (
    <div className="flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1 className="text-lg text-center">로그인</h1>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}
