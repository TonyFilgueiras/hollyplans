import React from "react";
import useForm from "../hooks/useForm";
import styled, { css } from "styled-components";
import Fadein from "../styles/animations/FadeIn";
import Button from "../components/Button";
import { Title } from "../styles/Title";

export type FormValues = {
  [key: string]: string;
};

export type InputConfig = {
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
};

type Props = {
  title: string;
  inputs: InputConfig[];
  handleSubmit: (values: any) => void;
  buttonText: string;
};

const AuthFormContainer = styled.div`
  opacity: 0;
  animation: ${Fadein} 2s forwards;
`;

const StyledTitle = styled.h1`
  ${Title({ animationDelay: 0 })}
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
`;

const StyledInput = styled.input<{ $animationDelay: number }>`
  opacity: 0;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  animation: ${Fadein} 2s forwards;
  ${(props) => css`
    animation-delay: ${props.$animationDelay}s;
  `}
`;

const StyledButton = styled(Button)<{ $animationDelay: number }>`
  opacity: 0;
  animation: ${Fadein} 2s forwards;
  ${(props) => css`
    animation-delay: ${props.$animationDelay}s;
  `}
`;

const AuthForm: React.FC<Props> = ({ title, inputs, handleSubmit, buttonText }) => {
  const { values, handleChange,} = useForm<FormValues>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(values);
    // resetForm();
  };

  return (
    <AuthFormContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledForm onSubmit={onSubmit}>
        {inputs.map((input, index) => (
          <StyledInput
            $animationDelay={(index + 1) / 2}
            key={index}
            type={input.type}
            name={input.name}
            value={values[input.name] || ""}
            onChange={handleChange}
            placeholder={input.placeholder}
            required={input.required}
          />
        ))}
        <StyledButton $animationDelay={(inputs.length + 1)/2} text={buttonText} type="submit" />
      </StyledForm>
    </AuthFormContainer>
  );
};

export default AuthForm;
