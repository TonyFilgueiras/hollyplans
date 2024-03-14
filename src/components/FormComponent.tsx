import React from "react";
import useForm from "../hooks/useForm";
import styled, { css } from "styled-components";
import Fadein from "../styles/animations/FadeIn";
import Button from "../components/Button";
import { Title } from "../styles/Title";
import { ReturnButton } from "../styles/ReturnButton";
import { useNavigate } from "react-router-dom";

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

const TagsContainer = styled.div<{ $animationDelay: number }>`
  opacity: 0;
  border: 1px solid #ccc;
  padding: 0.5em;
  border-radius: 2px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5em;
  animation: ${Fadein} 2s forwards;
`;

const TagItem = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  display: inline-block;
  padding: 0.5em 0.75em;
  border-radius: 20px;
  font-family: ${({ theme }) => theme.fonts.standard};

  .close {
    height: 20px;
    width: 20px;
    background-color: ${({ theme }) => theme.colors.pink};
    color: #fff;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.5em;
    font-size: 18px;
    cursor: pointer;
  }
`;

const TagInput = styled(StyledInput)`
  width: 100%;
`;

const AuthForm: React.FC<Props> = ({ title, inputs, handleSubmit, buttonText }) => {
  const { values, handleChange } = useForm<FormValues>({});
  const [tags, setTags] = React.useState<{ [name: string]: string[] }>(
    Object.fromEntries(inputs.filter((input) => input.type === "tags").map((input) => [input.name, []]))
  );
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ ...values, ...tags }); // Include tags in the form values
    // resetForm();
  };

  function handleKeyDown(inputName: string, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    if (!value.trim()) return;
    setTags((prevTags) => ({
      ...prevTags,
      [inputName]: [...prevTags[inputName], value],
    }));
    (e.target as HTMLInputElement).value = "";
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
            />
          ) : (
            <TagsContainer $animationDelay={(index + 1) / 2} key={index}>
              {tags[input.name].map((tag, tagIndex) => (
                <TagItem key={tagIndex}>
                  <span>{tag}</span>
                  <span className="close" onClick={() => removeTag(input.name, tagIndex)}>
                    x
                  </span>
                </TagItem>
              ))}
              <TagInput
                $animationDelay={(index + 1) / 2}
                onKeyDown={(e) => handleKeyDown(input.name, e)}
                type="text"
                placeholder={input.placeholder}
              />
            </TagsContainer>
          )
        )}

        <StyledButton $animationDelay={(inputs.length + 1) / 2} text={buttonText} type="submit" />
      </StyledForm>
    </AuthFormContainer>
  );
};

export default AuthForm;
