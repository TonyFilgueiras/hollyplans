import React from "react"; // Import the useForm hook
import styled from "styled-components";
import Fadein from "../styles/animations/FadeIn";
import FormComponent from "../components/FormComponent";
import IAuth from "../interfaces/IAuth";
import { useLogin } from "../hooks/useLogin";
import { UserContext } from "../contexts/UserContext";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const RegisterViewContainer = styled.div`
  opacity: 0;
  animation: ${Fadein} 2s forwards;
`;

const RegisterView = () => {
  const registerInputs = [
    { type: "text", name: "username", placeholder: "Username", required: true },
    { type: "email", name: "email", placeholder: "Email", required: true },
    { type: "password", name: "password", placeholder: "Password", required: true },
  ];
  const { createUserWithEmail } = useLogin();
  const { loading, loggedIn } = React.useContext(UserContext);
  const handleSubmit = (values: IAuth) => {
    createUserWithEmail(values);
  };
  const navigate = useNavigate()

  React.useEffect(() => {
    if (loggedIn) {
      navigate("/plans");
    }
  }, [loggedIn, navigate]);

  return (
    <RegisterViewContainer>
      {loading && <Loading text="Creating user..."/>}
      <FormComponent title="Register" inputs={registerInputs} buttonText="Submit" handleSubmit={(values) => handleSubmit(values)} />
    </RegisterViewContainer>
  );
};

export default RegisterView;
