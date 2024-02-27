import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user1 = localStorage.getItem('user');
    if (user1 !== null) {
      setUser(JSON.parse(user1));
    }
  }, []); 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};



export const useUser = () => useContext(UserContext);


