import React from "react";

interface ModalContextProps {
  children: React.ReactNode;
}

interface ModalContextType {
  isOpen: boolean;
  error: string,
  setError: (error: string) => void;
  success: string,
  setSuccess: (success: string) => void,
}
const initialValue = {
  isOpen: false,
  error: "",
  setError: () => {},
  success: "",
  setSuccess: () => {},
};

const ModalContext = React.createContext<ModalContextType>(initialValue);

export const ModalContextProvider = ({ children }: ModalContextProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')

  React.useEffect(() => {
    if (error || success) {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
        setError('')
        setSuccess('')
      }, 2000);
      
    }
  },[error, success])

  const contextValue: ModalContextType = {
    isOpen,
    setError,
    error,
    success,
    setSuccess,
  };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

export default ModalContext;
