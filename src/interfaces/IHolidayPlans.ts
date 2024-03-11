import firebase from "firebase/compat/app";

export default interface IHolidayPlans {
  activities:string[],
  description:string,
  endDate: firebase.firestore.Timestamp,
  location: string,
  participants: string[],
  startDate: firebase.firestore.Timestamp,
  user: string,
}