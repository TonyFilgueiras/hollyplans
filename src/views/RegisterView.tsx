import React from "react";// Import the useForm hook
import styled from "styled-components";
import Fadein from "../styles/animations/FadeIn";
import createUserWithEmail from "../services/createUser";
import FormComponent from "../components/FormComponent";
import IAuth from "../interfaces/IAuth";
import ModalContext from "../contexts/ModalContext";

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

  const {setError, setSuccess}= React.useContext(ModalContext)

  const handleSubmit = (values: IAuth) => {
    createUserWithEmail(values, setError, setSuccess);
  };

  return (
    <RegisterViewContainer>
      <FormComponent title="Register" inputs={registerInputs} buttonText="Submit" handleSubmit={(values) => handleSubmit(values)} />
    </RegisterViewContainer>
  );
};

export default RegisterView;
