import React from "react";

interface WarningModalContextProps {
  children: React.ReactNode;
}

interface WarningModalContextType {
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

const WarningModalContext = React.createContext<WarningModalContextType>(initialValue);

export const WarningModalContextProvider = ({ children }: WarningModalContextProps) => {
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

  const contextValue: WarningModalContextType = {
    isOpen,
    setError,
    error,
    success,
    setSuccess,
  };

  return <WarningModalContext.Provider value={contextValue}>{children}</WarningModalContext.Provider>;
};

export default WarningModalContext;
