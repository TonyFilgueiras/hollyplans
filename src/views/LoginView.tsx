import React from "react"; // Import the useForm hook
import styled from "styled-components";
import Fadein from "../styles/animations/FadeIn";
import FormComponent from "../components/FormComponent";
import IAuth from "../interfaces/IAuth";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Loading from "../components/Loading";

const LoginViewContainer = styled.div`
  opacity: 0;
  animation: ${Fadein} 2s forwards;
`;

const LoginView = () => {
  const navigate = useNavigate();
  const { loggedIn, loading } = React.useContext(UserContext);

  const { loginUserWithEmailAndPassword } = useLogin();

  const registerInputs = [
    { type: "email", name: "email", placeholder: "Email", required: true },
    { type: "password", name: "password", placeholder: "Password", required: true },
  ];

  async function handleSubmit(values: IAuth) {
    await loginUserWithEmailAndPassword({ email: values.email, password: values.password });
  }

  // React.useEffect(() => {
  //   loginWithUserId();
  // }, []);

  React.useEffect(() => {
    if (loggedIn) {
      navigate("/plans");
    }
  }, [loggedIn, navigate]);

  return (
    <LoginViewContainer>
      <FormComponent title="Login" inputs={registerInputs} buttonText="Submit" handleSubmit={(values) => handleSubmit(values)} />
      {loading && <Loading />}
    </LoginViewContainer>
  );
};

export default LoginView;
