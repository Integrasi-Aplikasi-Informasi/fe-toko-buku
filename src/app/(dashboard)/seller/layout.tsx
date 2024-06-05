// import ProtectedPage from "@/components/Auth/protectedPage";
'use client'
import React, { useEffect, useState } from 'react';
import { auth,database } from '/firebaseConfig';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut} from 'firebase/auth';
import { ref, onValue } from 'firebase/database'; 

export default function DashboardLayout({ children }) {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(!user){
        router.push('/login');
      }
      else {
        const currentUser = auth.currentUser;
        const userRef = ref(database, 'users/' + currentUser.uid);
        onValue(userRef, (snapshot) => {
          const role = snapshot.val().role
          setRole(role)
          setLoading(false)
        })
        
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSignOut = () => {
    signOut(auth);
  }
  
  
  if (role != "seller"){
    return (<main>Access Denied</main>)
  }

  return ( role == "seller" &&
  <main>
    {children}
    <button onClick={handleSignOut}>Sign Out</button>
  </main>
  )};