import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState('customer'); // default mode

  const [card,setCard] = useState([]);


  return (
    <UserContext.Provider value={{

      user, setUser,
      card,setCard
     }}>
      {children}
    </UserContext.Provider>
  );
};


export {UserContext,UserProvider};
