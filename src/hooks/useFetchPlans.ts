import { getDocs, collection } from "firebase/firestore";
import React from "react";
import { FBFirestore } from "../services/firebase";
import IHolidayPlans from "../interfaces/IHolidayPlans";
import ErrorContext from "../contexts/ErrorContext";
import { FirebaseError } from "@firebase/app";

export default function useFetchPlans() {
  const [plans, setPlans] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { setError } = React.useContext(ErrorContext);

  const getPlans = React.useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const querySnapshot = await getDocs(collection(FBFirestore, "holidayPlans"));

      querySnapshot.forEach((doc) => {
        setPlans((plans) => {
          const newData = doc.data();
          newData.id = doc.id;

          const isDuplicate = plans.some((card) => card.description === newData.description);
          if (!isDuplicate) {
            return [...plans, newData];
          }
          return plans as IHolidayPlans[];
        });
      });
    } catch (e) {
      const firebaseError = e as FirebaseError;
      try {
        setError("Error on fetching holiday plans: " + firebaseError.message);
      } catch {
        setError("Error on fetching holiday plans");
      }
    } finally {
      setLoading(false);
    }
  }, [setError]);

  return {
    plans,
    loading,
    getPlans,
  };
}
