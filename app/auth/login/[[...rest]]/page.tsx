import Navbar from "@/app/components/navbar";
import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <>
      <Navbar buttonText="Sign up" link="/auth/register" />
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <SignIn
          routing="path"
          path="/auth/login"
          afterSignUpUrl="/dashboard"
          afterSignInUrl="/dashboard"
        />
      </div>
    </>
  );
}
