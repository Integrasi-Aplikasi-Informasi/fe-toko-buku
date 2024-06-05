// Kurang insert ke database bagian courier



'use client'
import { useState } from 'react';
import { auth, database } from '/firebaseConfig';
import { ref, set } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/Auth/register-form';


const Register = () => {
  const router = useRouter()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller')
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      set(ref(database,'users/' + user.uid),{
        name : name,
        email: user.email,
        role: role 
      })
      if (role == 'seller'){
        set(ref(database, 'user_seller/' + user.uid),{
          email : user.email,
          product : [],
          uid : user.uid,
          username : name
        })
      } else if (role == 'buyer'){
        set(ref(database, 'user_buyer/' + user.uid),{
          email : user.email,
          orders : [],
          uid : user.uid,
          username : name,
          shipping_address : ""
        })
      }
      alert('Register Success')
      router.push('/login')
      
    } catch (error) {
      console.error("Error registering: ", error);
      setError(error.message)
    }
  };



  return (
    <main className="flex justify-center min-w-screen min-h-screen items-center flex-col">
      <RegisterForm 
      name={name}
      email={email} 
      password={password} 
      role={role}
      setName={setName}
      setEmail={setEmail} 
      setPassword={setPassword} 
      setRole={setRole} 
      handleSubmit={handleRegister}
      error={error}
      />
    </main>
  );
};

export default Register;
