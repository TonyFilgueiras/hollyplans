import { getDocs, collection, DocumentData, getDoc, doc } from "firebase/firestore";
import React from "react";
import { FBFirestore } from "../services/firebase";
import IHolidayPlans from "../interfaces/IHolidayPlans";
import ModalContext from "../contexts/WarningModalContext";
import { FirebaseError } from "@firebase/app";

export default function useFetchPlans() {
  const [plans, setPlans] = React.useState<IHolidayPlans[] | DocumentData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { setError } = React.useContext(ModalContext);

  const getPlans = React.useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const querySnapshot = await getDocs(collection(FBFirestore, "holidayPlans"));

      querySnapshot.forEach((doc) => {
        setPlans((plans) => {
          const newData = doc.data();
          newData.id = doc.id;

          const isDuplicate = plans.some((card) => card.name === newData.name);
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

  const getPlanById = React.useCallback(
    async (id: string) => {
      try {
        setError("");
        setLoading(true);

        const docRef = doc(FBFirestore, "holidayPlans", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          return  docSnap.data() as IHolidayPlans
        } 
      } catch (e) {
        console.log(e);
        setError("Error on fetching holiday plans");
      } finally {
        setLoading(false);
      }
    },
    [setError]
  );

  return {
    plans,
    loading,
    getPlans,
    getPlanById,
  };
}
