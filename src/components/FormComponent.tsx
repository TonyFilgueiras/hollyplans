import React, { FocusEventHandler } from "react";
import useForm from "../hooks/useForm";
import styled, { css } from "styled-components";
import Fadein from "../styles/animations/FadeIn";
import Button from "../components/Button";
import { Title } from "../styles/Title";
import { ReturnButton } from "../styles/ReturnButton";
import { useNavigate } from "react-router-dom";
import TagsContainer from "./TagsContainer";
import ModalContext from "../contexts/ModalContext";

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

const TitleHeader = styled.div`
  margin: auto;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InvisibleTag = styled.div`
  ${ReturnButton}
  visibility: hidden;
`;

const StyledTitle = styled.h1`
  ${Title({ animationDelay: 0 })}
  font-size:2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
`;

const StyledInput = styled.input<{ $animationDelay: number }>`
  opacity: 0;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  animation: ${Fadein} 2s forwards;
  margin: 0 auto 10px auto;
  width: 90%;
  background-color: #fff;
  ${(props) => css`
    animation-delay: ${props.$animationDelay}s;
  `}
`;

const StyledReturnButton = styled(Button)`
  ${ReturnButton}
`;

const StyledButton = styled(Button)<{ $animationDelay: number }>`
  opacity: 0;
  animation: ${Fadein} 2s forwards;
  ${(props) => css`
    animation-delay: ${props.$animationDelay}s;
  `}
`;

const AuthForm: React.FC<Props> = ({ title, inputs, handleSubmit, buttonText }) => {
  const { values, handleChange } = useForm<FormValues>({});
  const [tags, setTags] = React.useState<{ [name: string]: string[] }>(
    Object.fromEntries(inputs.filter((input) => input.type === "tags").map((input) => [input.name, []]))
  );
  const { setError } = React.useContext(ModalContext);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ ...values, ...tags });
    // resetForm();
  };

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.placeholder.includes("Date")) {
      e.target.type = "datetime-local";
      e.target.focus()
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.placeholder.includes("Date") && e.target.value === "") {
      e.target.type = "text";
    }
  }

  function handleKeyDown(inputName: string, e: React.KeyboardEvent<HTMLInputElement>) {
    setError(e.key);
    if (e.key !== "Enter") return;

    e.preventDefault();

    const value = (e.target as HTMLInputElement).value;
    if (!value.trim()) return;

    if (e.key === "Enter") {
      setTags((prevTags) => ({
        ...prevTags,
        [inputName]: [...prevTags[inputName], value],
      }));
      (e.target as HTMLInputElement).value = "";
    }
  }

  function removeTag(inputName: string, index: number) {
    setTags((prevTags) => ({
      ...prevTags,
      [inputName]: prevTags[inputName].filter((_, i) => i !== index),
    }));
  }

  return (
    <AuthFormContainer>
      <TitleHeader>
        <StyledReturnButton text="<" onClick={() => navigate(-1)} />
        <StyledTitle>{title}</StyledTitle>
        <InvisibleTag></InvisibleTag>
      </TitleHeader>
      <StyledForm onSubmit={onSubmit}>
        {inputs.map((input, index) =>
          input.type !== "tags" ? (
            <StyledInput
              $animationDelay={(index + 1) / 2}
              key={index}
              type={input.type}
              name={input.name}
              value={values[input.name] || ""}
              onChange={handleChange}
              placeholder={input.placeholder}
              required={input.required}
              onFocus={(e) => handleFocus(e)}
              onBlur={(e) => handleBlur(e)}
            />
          ) : (
            <TagsContainer
              index={index}
              inputName={input.name}
              inputPlaceholder={input.placeholder}
              tags={tags}
              handleKeyDown={handleKeyDown}
              removeTag={removeTag}
              key={index}
            />
          )
        )}

        <StyledButton $animationDelay={(inputs.length + 1) / 2} text={buttonText} type="submit" />
      </StyledForm>
    </AuthFormContainer>
  );
};

export default AuthForm;
