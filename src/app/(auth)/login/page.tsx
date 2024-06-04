'use client'
import LoginForm from "@/components/Auth/login-form";
import { useState } from 'react';
import { registerUser, signInUser } from "@/components/Auth/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInUser(email, password);
      toast("Login Success");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="flex justify-center min-w-screen min-h-screen items-center">
      <LoginForm email={email} password={password} error={error} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSignIn}/>
      <ToastContainer />
    </main>
  );
}
