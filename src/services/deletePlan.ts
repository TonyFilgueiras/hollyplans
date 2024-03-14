import { FBFirestore } from "./firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default async function deletePlan(
  planId: string,
  setError: (error: string) => void,
  setSuccess: (success: string) => void,
) {
  try {
    // Get the reference to the plan document
    const planDocRef = doc(FBFirestore, "holidayPlans", planId);

    // Delete the document
    await deleteDoc(planDocRef);

    setSuccess("Plan deleted");
  } catch (e: any) {
    setError("Error deleting plan");
    console.log(e);
  }
}
