import { useState } from "react";

const useCardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardId, setCardId] = useState<string | null>(null);

  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    cardId,
    setCard: (cardId: string | null) => setCardId(cardId),
  };
}

export default useCardModal;