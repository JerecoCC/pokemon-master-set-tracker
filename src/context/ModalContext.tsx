import React from "react";

const ModalContext = React.createContext<{
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  cardId: string | null;
  setCard: (cardId: string | null) => void;
}>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  cardId: null,
  setCard: () => {},
});

export default ModalContext;