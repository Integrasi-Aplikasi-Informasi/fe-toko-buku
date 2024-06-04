'use client'
// pages/login.js
import { useState } from 'react';
import { auth, database } from '/firebaseConfig';
import LoginForm from '@/components/Auth/login-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'firebase/database';
import { onValue } from 'firebase/database';
// import { useRouter } from 'next/router';
import { redirect , useRouter} from 'next/navigation';


const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // alert('success SignIn')
      // alert(userCredential.user.uid)
      const userRef = ref(database, ('users/' + userCredential.user.uid));
      onValue(userRef, (snapshot)=>{
        const role = snapshot.val().role
        if (role === 'seller') {
          alert('success SignIn0 ' + role)

        } else if (role == 'courier'){
          alert('success SignIn1 ' + role)
        } else if (role =='buyer'){
          alert('success SignIn2 ' + role)
          // Redirect to buyer
          router.push('/')
          
        }
      })
    } catch (error) {
      console.error("Error logging in: ", error);
      alert('Login Failed')
      setError(error.message)
    }
  };

  return (
    <main className="flex justify-center min-w-screen min-h-screen items-center flex-col">
      <LoginForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleLogin}/>
      <p>{email +';'+ password}</p>
      <p>{error}</p>
    </main>
  );
};

export default Login;





















// 'use client'
// import LoginForm from "@/components/Auth/login-form";
// import { useState } from 'react';
// import { registerUser, signInUser } from "@/components/Auth/auth";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Image from "next/image";


// export default function Home() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleRegister = async () => {
//     try {
//       await registerUser(email, password);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleSignIn = async () => {
//     try {
//       await signInUser(email, password);
//       toast("Login Success");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <main className="flex justify-center min-w-screen min-h-screen items-center">
//       <LoginForm email={email} password={password} error={error} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSignIn}/>
//       <ToastContainer />
//     </main>
//   );
// }
