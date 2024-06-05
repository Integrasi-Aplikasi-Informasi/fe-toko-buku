'use client'
import { useState } from 'react';
import { auth, database } from '/firebaseConfig';
import LoginForm from '@/components/Auth/login-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'firebase/database';
import { onValue } from 'firebase/database';
import { notFound, redirect , useRouter} from 'next/navigation';


const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userRef = ref(database, ('users/' + userCredential.user.uid));
      onValue(userRef, (snapshot)=>{
        const role = snapshot.val().role
        alert('success SignIn ' + role)
        router.push('/'+ role)
      })
    } catch (error) {
      console.error("Error logging in: ", error);
      alert('Login Failed')
      setError(error.message)
    }
  };

  return (
    <main 
    className="flex justify-center min-w-screen min-h-screen items-center flex-col"
    >
      <LoginForm 
      email={email} 
      password={password} 
      setEmail={setEmail} 
      setPassword={setPassword} 
      handleSubmit={handleLogin} 
      error={error}
      />
    </main>
  );
};

export default Login;