import { UserContext } from "../contexts/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import IAuth from "../interfaces/IAuth";
import React from "react";
import { getAuth } from "firebase/auth";
import { FBAuth, FBFirestore } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import ModalContext from "../contexts/WarningModalContext";

export function useLogin() {
  const { setUser, setLoading, setLoggedIn } = React.useContext(UserContext);
  const { setError, setSuccess } = React.useContext(ModalContext);

  async function getUserEmailAndUsername(user: any) {
    const userRef = doc(FBFirestore, "users", user.uid);
    const userDoc = await getDoc(userRef);

    const username = await userDoc.get("username");
    const email = await userDoc.get("email");
    return { username, email };
  }

  const loginUserWithEmailAndPassword = async ({ email, password }: IAuth) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(FBAuth, email, password);
      if (FBAuth.currentUser) {
        const userData = await getUserEmailAndUsername(FBAuth.currentUser);
        const accessToken = await getAuth().currentUser?.getIdToken();

        setUser(userData);

        console.log(FBAuth.currentUser);

        sessionStorage.setItem("userLoggedIn", accessToken!);
        setLoggedIn(true);
        setSuccess(`Welcome ${userData.username}!`);
        return true;
      }
    } catch (err: any) {
      if (err?.code === "auth/invalid-credential") {
        setError("Error on logging in: Check your email and password");
      } else {
        try {
          setError(`Error on logging in: ${err.message}`);
        } catch {
          setError("Error on logging in");
        }
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUserWithEmailAndPassword,
  };
}
