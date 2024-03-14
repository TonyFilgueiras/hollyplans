import { FBFirestore } from "./firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import IHolidayPlans from "../interfaces/IHolidayPlans";

export default async function createPlan(
  user: string,
  { activities, description, endDate, location, name, participants, startDate }: IHolidayPlans,
  setError: (error: string) => void,
  setSuccess: (success: string) => void
) {
  try {
    const holidayPlansCollectionRef = collection(FBFirestore, "holidayPlans");
    const newPlanDocRef = doc(holidayPlansCollectionRef);

    await setDoc(newPlanDocRef, {
      activities: activities || [],
      description: description || "",
      endDate: endDate || null,
      name: name,
      startDate: startDate || null,
      location: location || "",
      participants: participants || [],
      user: user,
    });
    setSuccess("Plan created");
  } catch (e: any) {
    setError("Error on new plan");
    console.log(e);
  }
}
