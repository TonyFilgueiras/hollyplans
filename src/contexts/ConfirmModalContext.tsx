import React from "react";

interface ConfirmModalContextProps {
  children: React.ReactNode;
}

interface ConfirmModalContextType {
  isOpen: boolean;
  openConfirmModal: () => void;
  closeModal: () => void;
}

const initialValue = {
  isOpen: false,
  openConfirmModal: () => {},
  closeModal: () => {},
};

const ConfirmModalContext = React.createContext<ConfirmModalContextType>(initialValue);

export const ConfirmModalContextProvider = ({ children }: ConfirmModalContextProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openConfirmModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  const contextValue: ConfirmModalContextType = {
    isOpen,
    openConfirmModal,
    closeModal,
  };

  return <ConfirmModalContext.Provider value={contextValue}>{children}</ConfirmModalContext.Provider>;
};
export default ConfirmModalContext;
