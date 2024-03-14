// import IUser from 'interfaces/IUser'
import React from "react";
// import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api'
import { useNavigate } from "react-router-dom";
import IUser from "../interfaces/IUser";
import ModalContext from "./ModalContext";

interface UserContextProps {
  children: React.ReactNode;
}
interface UserContextType {
  loading: boolean;
  setLoading: (newState: boolean) => void;
  user: IUser | undefined;
  setUser: (newState: IUser | undefined) => void;
  loggedIn: boolean;
  setLoggedIn: (newState: boolean) => void;
  userLogout: () => void;
}

const initialValue = {
  loading: true,
  setLoading: () => {},
  user: undefined,
  setUser: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  userLogout: () => {},
};

export const UserContext = React.createContext<UserContextType>(initialValue);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<IUser | undefined>();
  const { setError } = React.useContext(ModalContext);

  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setError("");
      setLoading(false);
      setLoggedIn(false);
      setUser(undefined);
      window.sessionStorage.clear();
      navigate("/");
    },
    [navigate, setError]
  );

  // async function getUser(token) {
  //   const{url, options}= USER_GET(token)
  //   const response = await fetch (url, options)
  //     const json = await response.json()
  //     setLoggedIn(true)
  //   }

  // async function userLogin(username, password) {
  //   try{
  //   setError('')
  //   setLoading(true)
  //   const{url, options}= TOKEN_POST({username, password})
  //   const tokenRes = await fetch (url, options)
  //   if (!tokenRes.ok) throw new Error (`Error: ${tokenRes.statusText}`)
  //   const {token} = await tokenRes.json()
  //   window.sessionStorage.setItem("token", token)
  //   await getUser(token)
  //   navigate("/conta")
  //   } catch (err) {
  //     setError(err.message)
  //     setLoggedIn(false)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return <UserContext.Provider value={{ loading, setLoading, user, setUser, loggedIn, setLoggedIn, userLogout }}>{children}</UserContext.Provider>;
};
