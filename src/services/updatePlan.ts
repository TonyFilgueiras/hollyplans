import { FBFirestore } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";
import IHolidayPlans from "../interfaces/IHolidayPlans";

export default async function updatePlan(
  planId: string,
  { activities, description, endDate, location, name, participants, startDate }: IHolidayPlans,
  setError: (error: string) => void,
  setSuccess: (success: string) => void
) {
  try {
    // Get the reference to the plan document
    const planDocRef = doc(FBFirestore, "holidayPlans", planId);

    // Update the document fields
    await updateDoc(planDocRef, {
      activities: activities || [],
      description: description || "",
      endDate: endDate || null,
      name: name,
      startDate: startDate || null,
      location: location || "",
      participants: participants || [],
    });

    setSuccess("Plan updated");
  } catch (e: any) {
    setError("Error updating plan");
    console.log(e);
  }
}
