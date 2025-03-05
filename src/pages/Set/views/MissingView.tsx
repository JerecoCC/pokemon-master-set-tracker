import { useContext, useMemo } from "react";
import { CardType } from "../../../types";
import Card from "../components/Card";
import CardsContext from "../../../context/CardsContext";

interface CardWithIndexType extends CardType {
  index: number
}

const MissingView = () => {
  const { cards, addCard } = useContext(CardsContext);

  const displayCards = useMemo(() => {
    return cards
      .map((card: CardType, index: number) => ({
        ...card,
        index
      }))
      .filter((card: CardWithIndexType) => card.hasCard === false)
  }, [cards]);
  
  return (
    <div className="missing-view">
      {displayCards.map((card: CardWithIndexType, index: number) => (
        <Card
          key={index}
          index={card.index}
          data={card}
          onAdd={addCard}
          onRemove={() => alert("Invalid action!")}
          onChangeLanguage={() => alert("Invalid action!")}
        />
      ))}
    </div>
  );
}

export default MissingView;