import Navbar from "@/app/components/navbar";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <Navbar buttonText="Sign in" link="/auth/login" />
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <SignUp
          routing="path"
          path="/auth/register"
          afterSignUpUrl="/dashboard"
          afterSignInUrl="/dashboard"
        />
      </div>
    </>
  );
}
