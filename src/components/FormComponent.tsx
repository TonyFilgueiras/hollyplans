import React from "react";
import useForm from "../hooks/useForm";
import styled, { css } from "styled-components";
import Fadein from "../styles/animations/FadeIn";
import Button from "../components/Button";
import { Title } from "../styles/Title";
import { ReturnButton } from "../styles/ReturnButton";
import { useNavigate } from "react-router-dom";
import TagsContainer from "./TagsContainer";
import ModalContext from "../contexts/WarningModalContext";
import IHolidayPlans from "../interfaces/IHolidayPlans";
import { RiDeleteBin5Fill } from "react-icons/ri";

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
  initialValues?: IHolidayPlans;
  title: string;
  inputs: InputConfig[];
  handleSubmit: (values: any) => void;
  buttonText: string;
  editing?: boolean;
  handleDelete?: (value: string) => void;
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

const DeleteButton = styled.div`
  ${ReturnButton}
  margin: 10px;
  transition: all.2s;
  color: ${({ theme }) => theme.colors.pink};
  line-height: 57px;
  font-size: 1.5rem;

  &.notEditing {
    visibility: hidden;
  }

  &:hover {
    filter: brightness(1.1);
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
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

const AuthForm: React.FC<Props> = ({ initialValues, title, inputs, handleSubmit, buttonText, editing = false, handleDelete= ()=>{} }) => {
  const { values, setValues, handleChange } = useForm<FormValues>({});
  const [tags, setTags] = React.useState<{ [name: string]: string[] }>(
    Object.fromEntries(inputs.filter((input) => input.type === "tags").map((input) => [input.name, []]))
  );
  const { setError } = React.useContext(ModalContext);
  const navigate = useNavigate();

  const mapHolidayPlansToFormValues = (holidayPlans: IHolidayPlans): FormValues => {
    const formValues: FormValues = {};
    for (const key in holidayPlans) {
      if (Array.isArray(holidayPlans[key])) {
        const myArray = holidayPlans[key] as string[];
        myArray.forEach((value) => {
          setTags((prevTags) => {
            const tags = prevTags[key] || [];
            // Check if the value already exists
            if (!tags.includes(value)) {
              return {
                ...prevTags,
                [key]: [...tags, value],
              };
            }
            return prevTags; // If value exists, return the same state
          });
        });
      } else {
        formValues[key] = holidayPlans[key] as string;
      }
    }
    return formValues;
  };
  React.useEffect(() => {
    if (initialValues) {
      const formValues = mapHolidayPlansToFormValues(initialValues);
      setValues(formValues);
    }
  }, [initialValues, setValues]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ ...values, ...tags });
    // resetForm();
  };

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.placeholder.includes("Date")) {
      e.target.type = "datetime-local";
      e.target.focus();
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.placeholder.includes("Date") && e.target.value === "") {
      e.target.type = "text";
    }
  }

  function handleKeyDown(inputName: string, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const value = (e.target as HTMLInputElement).value.trim();
    if (!value) return;

    setTags((prevTags) => {
      const tags = prevTags[inputName] || [];
      // Check if the value already exists
      if (!tags.includes(value)) {
        return {
          ...prevTags,
          [inputName]: [...tags, value],
        };
      }
      setError("Tag already inserted");
      return prevTags; // If value exists, return the same state
    });
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
        <DeleteButton
          className={editing ? "editing" : "notEditing"}
          onClick={() => {
            handleDelete(initialValues!.id);
          }}
        >
          <RiDeleteBin5Fill />
        </DeleteButton>
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
