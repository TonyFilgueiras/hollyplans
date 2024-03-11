import React from "react";// Import the useForm hook
import styled from "styled-components";
import Fadein from "../styles/animations/FadeIn";
import FormComponent from "../components/FormComponent";
import IAuth from "../interfaces/IAuth";
import loginUser from "../services/loginUser";

const LoginViewContainer = styled.div`
  opacity: 0;
  animation: ${Fadein} 2s forwards;
`;

const LoginView = () => {
  const registerInputs = [
    { type: "email", name: "email", placeholder: "Email", required: true },
    { type: "password", name: "password", placeholder: "Password", required: true },
  ];

  const handleSubmit = (values: IAuth) => {
    console.log("Form submitted:", values);
    loginUser(values);
  };

  return (
    <LoginViewContainer>
      <FormComponent title="Login" inputs={registerInputs} buttonText="Submit" handleSubmit={(values) => handleSubmit(values)} />
    </LoginViewContainer>
  );
};

export default LoginView;
