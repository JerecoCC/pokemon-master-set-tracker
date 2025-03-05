import { useContext, useMemo } from "react";
import { CardType } from "../../../types";
import Card from "../components/Card";
import CardsContext from "../../../context/CardsContext";

interface CardWithIndexType extends CardType {
  index: number
}

const JapaneseView = () => {
  const { cards, removeCard, changeLanguage } = useContext(CardsContext);

  const displayCards = useMemo(() => {
    return cards
      .map((card: CardType, index: number) => ({
        ...card,
        index
      }))
      .filter((card: CardWithIndexType) => card.hasCard && card.language === "jap")
  }, [cards]);
  
  return (
    <div className="japanese-view">
      {displayCards.map((card: CardWithIndexType, index: number) => (
        <Card
          key={index}
          index={card.index}
          data={card}
          onAdd={() => alert("Invalid action!")}
          onRemove={removeCard}
          onChangeLanguage={changeLanguage}
        />
      ))}
    </div>
  );
}

export default JapaneseView;