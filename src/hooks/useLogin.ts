import { UserContext } from "../contexts/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import IAuth from "../interfaces/IAuth";
import React from "react";
import { getAuth } from "firebase/auth";
import { FBAuth, FBFirestore } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import ErrorContext from "../contexts/ErrorContext";

export function useLogin() {
  const { setUser, setLoading, setLoggedIn } = React.useContext(UserContext);
  const { setError } = React.useContext(ErrorContext);

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

  // const createUserWithGoogle = async () => {
  //   try {
  //     setLoading(true);
  //     await signInWithPopup(FBAuth, googleProvider);
  //     if (FBAuth.currentUser) {
  //       const user = FBAuth.currentUser;
  //       const userData = {
  //         created: "google",
  //         displayName: user.displayName,
  //         email: user.email,
  //         photoURL: user.photoURL,
  //         telefone: user.providerData[0].phoneNumber,
  //         whatsapp: user.providerData[0].phoneNumber ? true : false,
  //         prestador: false,
  //         prestadorAprovado: false,
  //         admin: false,
  //       };
  //       // Store the user data in Firestore
  //       const userDocRef = doc(FBFirestore, "usuarios", user.uid);
  //       const userDocSnapshot = (await getDoc(userDocRef)) as DocumentSnapshot<IUser>;

  //       if (!userDocSnapshot.exists()) {
  //         await setDoc(userDocRef, userData);
  //       }

  //       setUser(userDocSnapshot.data());
  //       setLoggedIn(true);
  //       sessionStorage.setItem("userLogado", JSON.stringify(userDocSnapshot.data()));
  //       return "login";
  //     }
  //   } catch (err: any) {
  //     setError(err);
  //     console.log(err);
  //     if (err.code !== "auth/cancelled-popup-request" && err.code !== "auth/popup-blocked" && err.code !== "auth/popup-closed-by-user")
  //       alert("Erro ao criar usuario: " + err);
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const createUserWithFacebook = async () => {
  //   try {
  //     setLoading(true);
  //     // Sign in with Facebook
  //     await signInWithPopup(FBAuth, facebookProvider);

  //     if (FBAuth.currentUser) {
  //       const user = FBAuth.currentUser;
  //       const userData = {
  //         created: "facebook",
  //         displayName: user.displayName,
  //         email: user.email,
  //         photoURL: user.photoURL,
  //         telefone: user.providerData[0].phoneNumber,
  //         whatsapp: user.providerData[0].phoneNumber ? true : false,
  //         prestador: false,
  //         prestadorAprovado: false,
  //         admin: false,
  //       };

  //       // Store the user data in Firestore
  //       const userDocRef = doc(FBFirestore, "usuarios", user.uid);
  //       const userDocSnapshot = (await getDoc(userDocRef)) as DocumentSnapshot<IUser>;

  //       if (!userDocSnapshot.exists()) {
  //         await setDoc(userDocRef, userData);
  //       }

  //       setUser(userDocSnapshot.data());
  //       setLoggedIn(true);
  //       sessionStorage.setItem("userLogado", JSON.stringify(userDocSnapshot.data()));

  //       return "login";
  //     }
  //   } catch (err: any) {
  //     setError(err);
  //     alert("Erro ao criar usuario: " + err);
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return {
    loginUserWithEmailAndPassword,
    // createUserWithGoogle,
    // createUserWithFacebook,
  };
}
