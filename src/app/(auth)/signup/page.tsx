'use client'
// pages/login.js
import { useState } from 'react';
import { auth, database } from '/firebaseConfig';
import { ref, set } from 'firebase/database';
import SignuUpForm from '@/components/Auth/signup-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Login from '../login/page';
import { redirect } from 'next/dist/server/api-utils';



const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller')
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // await database.ref('users/' + user.uid).set({
      //   email: user.email,
      //   role: role 
      // });
      set(ref(database,'users/' + user.uid),{
        email: user.email,
        role: role 
      })
      alert('Register Success')
      redirect('/login')
    } catch (error) {
      console.error("Error registering: ", error);
      setError(error.message)
    }
  };



  return (
    <main className="flex justify-center min-w-screen min-h-screen items-center flex-col">
      <SignuUpForm 
      email={email} 
      password={password} 
      role={role}
      setEmail={setEmail} 
      setPassword={setPassword} 
      setRole={setRole} 
      handleSubmit={handleRegister}/>
      {email +';'+ password +';'+ role}
      <p>{error}</p>
    </main>
  );
};

export default Register;

















// 'use client'
// import { useState } from 'react';
// import { registerUser, signInUser } from "@/components/Auth/auth";
// import SignuUpForm from "@/components/Auth/signup-form";
// import Image from "next/image";


// export default function Home() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleRegister = async () => {
//     try {
//       await registerUser(email, password);
//       toast("Sign Up Success");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleSignIn = async () => {
//     try {
//       await signInUser(email, password);
//     } catch (error) {
//       setError(error.message);
//     }
//   };
//   return (
//     <main className="flex justify-center min-w-screen min-h-screen items-center">
//       <SignuUpForm email={email} password={password} error={error} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleRegister}/>
//     </main>
//   );
// }
