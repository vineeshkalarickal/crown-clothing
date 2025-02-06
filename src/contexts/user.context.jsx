import { useState, createContext, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
//storage placeholder, as the actual value you want to access
export const UserContext = createContext({
  currentUser: null, //empty state of a user object.
  setCurrentUser: () => null,
});

//actual provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
    });
    return unsubscribe; // unsubscribe on unmount to prevent memory leaks.
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
