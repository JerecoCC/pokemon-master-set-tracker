import { useContext, useEffect, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ModalContext from "../../../context/ModalContext";

const CardModal = () => {
  const { cardId, isOpen, closeModal } = useContext(ModalContext);
  const [card, setCard] = useState<{[key: string]: any} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogRef?.current) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        dialogRef.current.showModal();
      } else {
        document.body.style.overflow = 'auto';
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.pokemontcg.io/v2/cards?q=id:" + cardId)
      .then((response) => response.json())
      .then((json) => {
        setCard(json.data[0]);
        setIsLoading(false);
      });
  }, [cardId]);

  return (
    <dialog
      ref={dialogRef}
      className="card-modal"
    >
      <div className="modal-header">
        <h3>Card Details</h3>
        <button className="close" onClick={() => closeModal()}>Close</button>
      </div>
      <div className="modal-body">
        {isLoading ? <Skeleton height={700} width={501.75} /> : (
          <img
            className="card-image"
            src={card?.images.large}
          />
        )}
      </div>
    </dialog>
  );
}

export default CardModal;