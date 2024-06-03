import AuthForm from "@/components/Auth/login-form";
import SignuUpForm from "@/components/Auth/signup-form";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex justify-center min-w-screen min-h-screen items-center">
      <SignuUpForm></SignuUpForm>
    </main>
  );
}
