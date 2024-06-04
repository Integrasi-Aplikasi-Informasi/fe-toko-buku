'use client'
import { useState } from 'react';
import { registerUser, signInUser } from "@/components/Auth/auth";
import SignuUpForm from "@/components/Auth/signup-form";
import Image from "next/image";


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
      toast("Sign Up Success");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInUser(email, password);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <main className="flex justify-center min-w-screen min-h-screen items-center">
      <SignuUpForm email={email} password={password} error={error} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleRegister}/>
    </main>
  );
}
