import { useContext, useMemo } from "react";
import { CardType, PageSize, ViewModeType } from "../../../types";
import CardsContext from "../../../context/CardsContext";
import CardsPerPageSelect from "./CardsPerPageSelect";
import ViewModeSelect from "./ViewModeSelect";

type Props = {
  data: {[key: string]: any}
  viewMode: ViewModeType;
  onBackToSets: () => void;
  onChangeView: (view: ViewModeType) => void;
}

const SetHeader = (props: Props) => {
  const {
    data,
    viewMode, 
    onBackToSets, 
    onChangeView
  } = props;
  const {cards, pageSize, changePageSize} = useContext(CardsContext);

  const hasCardsCount = useMemo(() => {
    return cards.reduce((count: number, x: CardType) => x.hasCard ? count + 1 : count, 0)
  }, [cards]);

  const hasCardsPercentage = useMemo(() => {
    return `${Math.round((hasCardsCount / cards.length) * 100)}%`
  }, [hasCardsCount]);

  return (
    <>
      <div className="extra-actions">
        <button className="back-sets" onClick={onBackToSets}>Back to Sets</button>
        <div className="dropdown-actions">
          <CardsPerPageSelect
            value={pageSize} 
            onChange={(value) => changePageSize(Number(value) as PageSize)}
          />
          <ViewModeSelect
            value={viewMode} 
            onChange={(value) => onChangeView(value)}
          />
        </div>
      </div>
      <img className="set-logo" src={data.images?.logo} />
      <div className="title">
        <p className="set-symbol">{data.ptcgoCode}</p>
        <b>{data.name}</b>
        <i>({hasCardsCount} / {cards.length})</i>
      </div>
      <progress 
        id="cardCountPercentage"
        value={hasCardsCount} 
        max={cards.length}
        title={hasCardsPercentage}
      >
        {hasCardsPercentage}
      </progress>
    </>
  )
}

export default SetHeader;