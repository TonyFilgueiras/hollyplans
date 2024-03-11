import React from "react";

interface ErrorContextProps {
  children: React.ReactNode;
}

interface ErrorContextType {
  isOpen: boolean;
  error: string,
  setError: (error: string) => void;
}
const initialValue = {
  isOpen: false,
  error: "",
  setError: () => {},
};

const ErrorContext = React.createContext<ErrorContextType>(initialValue);

export const ErrorContextProvider = ({ children }: ErrorContextProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    if (error) {
      setIsOpen(true);
      console.log(error)
      setTimeout(() => {
        setIsOpen(false);
        setError('')
      }, 2000);
      
    }
  },[error])

  const contextValue: ErrorContextType = {
    isOpen,
    setError,
    error
  };

  return <ErrorContext.Provider value={contextValue}>{children}</ErrorContext.Provider>;
};

export default ErrorContext;
