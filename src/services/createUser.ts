import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FBAuth, FBFirestore } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import IAuth from "../interfaces/IAuth";

export default async function createUserWithEmail({ username, email, password }: IAuth, setError: (error: string) => void) {
  try {
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
      setError("Usuário criado com sucesso");
      signInWithEmailAndPassword(FBAuth, email, password);
    });
  } catch (e: any) {
    if (e?.code === "auth/email-already-in-use") {
      setError("Error on creating user: Email already being used");
    } else if (e?.code === "auth/weak-password") {
      setError("Error on creating user: Password is too weak");
    } else if (e?.code === "auth/invalid-email") {
      setError("Error on creating user: Invalid email");
    } else {
      try {
        setError(`Error on creating user: ${e.message}`);
      } catch {
        setError("Error on creating user");
      }
    }

    console.log(e);
  }
}
