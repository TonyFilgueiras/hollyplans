import { UserContext } from "../contexts/UserContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import IAuth from "../interfaces/IAuth";
import React from "react";
import { getAuth } from "firebase/auth";
import { FBAuth, FBFirestore } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
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

  async function createUserWithEmail({ username, email, password }: IAuth) {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(FBAuth, email, password).then(async (userCredential) => {
        const uid = userCredential.user.uid;
        await updateProfile(userCredential.user, {
          displayName: username,
        });
        const userDocRef = doc(FBFirestore, "users", uid);
        await setDoc(userDocRef, {
          created: "email",
          username: username,
          email: email,
        });
        setSuccess("User created");
        loginUserWithEmailAndPassword({email, password});
      });
    } catch (e: any) {
      if (e?.code === "auth/email-already-in-use") {
        setError("Error on creating user: Email already being used");
      } else if (e?.code === "auth/weak-password") {
        setError("Error on creating user: Password is too weak");
      } else if (e?.code === "auth/invalid-email") {
        setError("Error on creating user: Invalid email");
      } else {
        setError("Error on creating user");
      }

      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return {
    loginUserWithEmailAndPassword,
    createUserWithEmail,
  };
}
