import React from "react";
import FormComponent from "../components/FormComponent";
import { UserContext } from "../contexts/UserContext";
import IHolidayPlans from "../interfaces/IHolidayPlans";
import createPlan from "../services/createPlan";
import ModalContext from "../contexts/ModalContext";

export default function NewPlanView() {
  const createPlansInputs = [
    { type: "text", name: "name", placeholder: "Plan Title", required: true },
    { type: "text", name: "description", placeholder: "description", required: false },
    { type: "text", name: "location", placeholder: "Location", required: false },
    { type: "text", name: "startDate", placeholder: "Start Date", required: false },
    { type: "text", name: "endDate", placeholder: "End Date", required: false },
    // { type: "tags", name: "participants", placeholder: "Participants", required: false },
    { type: "tags", name: "activities", placeholder: "Activities", required: false },
  ];

  const { setError, setSuccess } = React.useContext(ModalContext);
  const { user } = React.useContext(UserContext);

  function handleSubmit(values: IHolidayPlans) {
    console.log(values)
    createPlan(user!.username, values, setError, setSuccess);
  }

  return (
    <>
      <FormComponent
        title="New Plan"
        buttonText="Create Plan"
        handleSubmit={(values: IHolidayPlans) => {
          handleSubmit(values);
        }}
        inputs={createPlansInputs}
      />
    </>
  );
}
