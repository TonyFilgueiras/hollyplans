import { useState, ChangeEvent } from "react";

type FormValues = {
  [key: string]: string;
};

type FormState<T> = {
  values: T;
  setValues: (value: T) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
};

const useForm = <T extends FormValues>(initialValues: T): FormState<T> => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    setValues,
    handleChange,
    resetForm
  };
};

export default useForm;
