import React from "react";
import { collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import IHolidayPlans from "../interfaces/IHolidayPlans";
import WarningModalContext from "../contexts/WarningModalContext";
import { FBFirestore } from "../services/firebase";

export function usePlanCRUD() {
  const [loading, setLoading] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState("");
  const { setError, setSuccess } = React.useContext(WarningModalContext);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}h`;
  };
  async function createPlan(user: string, { activities, description, endDate, location, name, participants, startDate }: IHolidayPlans) {
    try {
      setLoadingText("Creating Plan...");
      setLoading(true);
      const holidayPlansCollectionRef = collection(FBFirestore, "holidayPlans");
      const newPlanDocRef = doc(holidayPlansCollectionRef);

      const endDateFormatted = formatDate(endDate);
      const startDateFormatted = formatDate(startDate);

      await setDoc(newPlanDocRef, {
        activities: activities || [],
        description: description || "",
        endDate: endDateFormatted || null,
        name: name,
        startDate: startDateFormatted || null,
        location: location || "",
        participants: participants,
        user: user,
      });
      setSuccess("Plan created");
    } catch (e: any) {
      setError("Error on new plan");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function updatePlan(planId: string, { activities, description, endDate, location, name, participants, startDate }: IHolidayPlans) {
    try {
      setLoadingText("Updating...");
      setLoading(true);
      // Get the reference to the plan document
      const planDocRef = doc(FBFirestore, "holidayPlans", planId);
      const endDateFormatted = formatDate(endDate);
      const startDateFormatted = formatDate(startDate);
      // Update the document fields
      await updateDoc(planDocRef, {
        activities: activities || [],
        description: description || "",
        endDate: endDateFormatted || null,
        name: name,
        startDate: startDateFormatted || null,
        location: location || "",
        participants: participants || [],
      });

      setSuccess("Plan updated");
    } catch (e: any) {
      setError("Error updating plan");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function deletePlan(planId: string) {
    try {
      setLoadingText("Deleting...");
      setLoading(true);
      // Get the reference to the plan document
      const planDocRef = doc(FBFirestore, "holidayPlans", planId);

      // Delete the document
      await deleteDoc(planDocRef);

      setSuccess("Plan deleted");
    } catch (e: any) {
      setError("Error deleting plan");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    loadingText,
    setLoadingText,
    createPlan,
    deletePlan,
    updatePlan,
  };
}
