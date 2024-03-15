export default interface IHolidayPlans {
  id: string,
  name: string,
  activities:string[],
  description:string,
  endDate: string,
  location: string,
  participants: string,
  startDate: string,
  user: string,
  [key: string]: string | string[];
}