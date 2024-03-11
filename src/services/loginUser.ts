import { signInWithEmailAndPassword } from "firebase/auth";
import { FBAuth } from "./firebase";
import IAuth from "../interfaces/IAuth";

export default async function loginUser({ email, password }: IAuth) {
  try {
    await signInWithEmailAndPassword(FBAuth, email, password);
    sessionStorage.setItem("userLoggedIn", JSON.stringify(FBAuth.currentUser?.displayName));
    console.log(FBAuth.currentUser);
    return "login";
  } catch (err) {
    alert("Error on logging in: Check if your email and password are correct.");
    console.log(err);
    return null;
  }
}
