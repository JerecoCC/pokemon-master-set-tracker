import { useMemo } from "react";
import { CardType } from "../types";

type Props = {
  data: CardType[]
}

const CardProgress = (props: Props) => {
  const {data} = props;

  const hasCardsCount = useMemo(() => {
    return data.reduce((count, x) => x.hasCard ? count + 1 : count, 0)
  }, [data]);
  
  const hasCardsPercentage = useMemo(() => {
    return `${Math.round((hasCardsCount / data.length) * 100)}%`
  }, [hasCardsCount]);

  return (
    <progress 
        id="cardCountPercentage"
        value={hasCardsCount} 
        max={data.length}
        title={hasCardsPercentage}
      >
        {hasCardsPercentage}
      </progress>
  );
}

export default CardProgress;