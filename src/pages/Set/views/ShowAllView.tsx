import { useContext, useEffect, useMemo, useState } from "react";
import { CardDisplayType, CardType } from "../../../types";
import Card from "../components/Card";
import CardsContext from "../../../context/CardsContext";
import usePageNavigator from "../../../hooks/usePageNavigator";
import PageNavigator from "../components/PageNavigator";
import PageIndicator from "../components/PageIndicator";
import classNames from "classnames";

const ShowAllView = () => {
  const {cards, pageSize, addCard, removeCard, changeLanguage} = useContext(CardsContext);
  const [displayCards, setDisplayCards] = useState<CardDisplayType>({ left: [], right: [] });

  const {
    page,
    pageCount,
    toFirstPage,
    toBackPage,
    toNextPage,
    toLastPage
  } = usePageNavigator(cards.length, pageSize);

  useEffect(() => {
    const left: CardType[] = cards.slice((page - 2) * pageSize, ((page - 2) * pageSize) + pageSize);
    const right: CardType[] = cards.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize);
    setDisplayCards({ left: left, right: right });
  }, [page, cards, pageSize]);

  return (
    <div className="show-all-view">
      <PageNavigator {
        ...{
          page,
          pageCount,
          toFirstPage,
          toBackPage,
          toNextPage,
          toLastPage
        }}
      />

      <PageIndicator {...{page, pageCount}} />

      <div className={`display per-page-${pageSize}`}>
        <div className={classNames("cards left", {
          "empty": displayCards.left.length === 0
        })}>
          {displayCards.left.map((card: CardType, index: number) => {
            return (
              <Card
                key={card.id + "-" + card.variant}
                index={((page - 2) * pageSize) + index}
                data={card}
                onAdd={addCard}
                onRemove={removeCard}
                onChangeLanguage={changeLanguage}
              />
            );
          })}
        </div>
        <div className={classNames("cards right", {
          "empty": displayCards.right.length === 0
        })}>
          {displayCards.right.map((card: CardType, index: number) => {
            return (
              <Card
                key={card.id + "-" + card.variant}
                index={((page - 1) * pageSize) + index}
                data={card}
                onAdd={addCard}
                onRemove={removeCard}
                onChangeLanguage={changeLanguage}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShowAllView;