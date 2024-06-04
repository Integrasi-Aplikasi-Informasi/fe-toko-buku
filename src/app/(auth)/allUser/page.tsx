// pages/index.js
'use client'
import { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { database } from '/firebaseConfig';

const HomePage = () => {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const usernamesArray = Object.values(usersData).map(user => user.username);
        setUsernames(usernamesArray);
      }
    });
  }, []);

  return (
    <div>
      <h1>All Usernames</h1>
      <ul>
        {usernames.map((username, index) => (
          <li key={index}>{username}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
