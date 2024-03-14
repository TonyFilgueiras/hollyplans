import React from "react";
import FormComponent from "../components/FormComponent";
import { UserContext } from "../contexts/UserContext";
import IHolidayPlans from "../interfaces/IHolidayPlans";
import createPlan from "../services/createPlan";
import WarningModalContext from "../contexts/WarningModalContext";
import { useNavigate, useParams } from "react-router-dom";
import useFetchPlans from "../hooks/useFetchPlans";
import updatePlan from "../services/updatePlan";
import ConfirmModalContext from "../contexts/ConfirmModalContext";
import ConfirmModal from "../components/ConfirmModal";
import deletePlan from "../services/deletePlan";
import Loading from "../components/Loading";

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
  const [loadingText, setLoadingText] = React.useState("");
  const { id } = useParams();
  const { setError, setSuccess } = React.useContext(WarningModalContext);
  const { openConfirmModal } = React.useContext(ConfirmModalContext);
  const { user } = React.useContext(UserContext);
  const { getPlanById } = useFetchPlans();
  const navigate = useNavigate();

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

  async function handleSubmit(values: IHolidayPlans) {
    if (id) {
      setLoadingText("Updating...");
      await updatePlan(id, values, setError, setSuccess);
    } else {
      setLoadingText("Creating Plan...");
      await createPlan(user!.username, values, setError, setSuccess);
    }
    navigate("/plans");
    setLoadingText("");
  }

  function handleOpenModal() {
    openConfirmModal();
  }

  async function handleDeleteConfirmed() {
    setLoadingText("Deleting...");
    await deletePlan(id!, setError, setSuccess);
    setLoadingText("");
    navigate("/plans");
  }

  return (
    <>
      <FormComponent
        title={id ? "Edit Plan" : "New Plan"}
        buttonText={id ? "Update Plan" : "Create Plan"}
        handleSubmit={(values: IHolidayPlans) => {
          handleSubmit(values);
        }}
        editing={id ? true : false}
        handleDelete={handleOpenModal}
        inputs={createPlansInputs}
        initialValues={plan}
      />
      {plan && (
        <ConfirmModal
          onConfirm={handleDeleteConfirmed}
          modalTitle={`Delete ${plan!.name}?`}
          modalSubTitle={`are you sure you want to delete ${plan!.name}??`}
        />
      )}
      {loadingText && <Loading text={loadingText} />}
    </>
  );
}
