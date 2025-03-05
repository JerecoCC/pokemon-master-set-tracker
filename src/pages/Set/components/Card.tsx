import classNames from "classnames";
import { CardType } from "../../../types"
import { useContext, useMemo } from "react";
import CardsContext from "../../../context/CardsContext";
import ModalContext from "../../../context/ModalContext";

type Prop = {
  index: number;
  data: CardType;
  onAdd: (index: number) => void;
  onRemove: (index: number) => void;
  onChangeLanguage: (index: number) => void;
}

const Card = (props: Prop) => {
  const {index, data, onAdd, onRemove, onChangeLanguage} = props;
  const {pageSize} = useContext(CardsContext);
  const {openModal, setCard} = useContext(ModalContext);

  const cardTitlePage = useMemo(() => (
    `Page ${Math.ceil((index + 1) / pageSize)}`
  ), [index, pageSize]);

  const cardTitleIndex = useMemo(() => (
    `Card ${((index + 1) % pageSize) > 0 ? (index + 1) % pageSize : "9"}`
  ), [index, pageSize]);

  const handleCardClick = () => {
    openModal();
    setCard(data.id);
  }
  
  return (
    <div 
      className="card" 
      title={`${cardTitlePage}, ${cardTitleIndex}`}
      onClick={handleCardClick}
    >
      <div className={classNames("overlay", {"has-card": data.hasCard})}>
        {data.hasCard ? (
          <div className="has-card-buttons">
            <button 
              title="Remove card"
              className="card-button remove-card" 
              onClick={(e) => {
                e.stopPropagation();
                onRemove(index)
              }}
            >
              ×
            </button>
            <button
              title="Change language"
              className="card-button change-language" 
              onClick={(e) => {
                e.stopPropagation();
                onChangeLanguage(index)
              }}
            >
              🌐
            </button>
          </div>
        ) : (
          <button
            title="Add card"
            className="card-button add-card" 
            onClick={(e) => {
              e.stopPropagation();
              onAdd(index)
            }}
          >
            +
          </button>
        )}
      </div>
      <img src={data.image} />
      <div className="overlay-info">
        {data.language !== "eng" && (
          <p className="card-info language">🔴</p>
        )}
        {data.variant !== "normal" && (
          <p className="card-info variant">{data.variant[0]}</p>
        )}
      </div>
    </div>
  )
}

export default Card;