import React from "react";
import FormComponent from "../components/FormComponent";
import { UserContext } from "../contexts/UserContext";
import IHolidayPlans from "../interfaces/IHolidayPlans";
import createPlan from "../services/createPlan";
import ModalContext from "../contexts/ModalContext";
import { useParams } from "react-router-dom";
import useFetchPlans from "../hooks/useFetchPlans";
import updatePlan from "../services/updatePlan";

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
  const [plan, setPlan] = React.useState<IHolidayPlans>();
  const { id } = useParams();
  const { setError, setSuccess } = React.useContext(ModalContext);
  const { user } = React.useContext(UserContext);
  const { getPlanById } = useFetchPlans();

  React.useEffect(() => {
    const fetchPlan = async () => {
      try {
        if (id) {
          const planData = await getPlanById(id);

          setPlan(planData);
        }
      } catch (err) {
        console.log(err);
        console.error("Error fetching plan:");
      }
    };
    fetchPlan();
  }, [getPlanById, id]);

  function handleSubmit(values: IHolidayPlans) {
    console.log(values);
    if (id) {
      updatePlan(id, values, setError, setSuccess);
    } else {
      createPlan(user!.username, values, setError, setSuccess);
    }
  }

  return (
    <FormComponent
      title={id ? "Edit Plan" : "New Plan"}
      buttonText={id ? "Update Plan" : "Create Plan"}
      handleSubmit={(values: IHolidayPlans) => {
        handleSubmit(values);
      }}
      inputs={createPlansInputs}
      initialValues={plan}
    />
  );
}
