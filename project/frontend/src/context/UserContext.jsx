import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState('customer'); // default mode

  const [card,setCard] = useState([]);

  const [inn,setInn] = useState(null);// current user id
// test1
  return (
    <UserContext.Provider value={{

      user, setUser,
      card,setCard,
      inn,setInn
     }}>
      {children}
    </UserContext.Provider>
  );
};


export {UserContext,UserProvider};
