import { useEffect, useState } from "react";
import { CardType, PageSize } from "../types";

type ReturnType = {
  data: [CardType[], (cards: CardType[]) => void],
  pageSize: PageSize;
  addCard: (index: number) => void;
  removeCard: (index: number) => void;
  changeLanguage: (index: number) => void;
  changePageSize: (size: PageSize) => void;
}

const useCards = (setId?: string, setCode?: string): ReturnType => {
  const [data, setData] = useState<CardType[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>(9);

  useEffect(() => {
    const localCards = localStorage.getItem("cards");
    if (setCode && setId) {
      const localCardsParsed: { [key: string]: CardType[] } = localCards && JSON.parse(localCards);
      if (setCode && localCardsParsed[setCode] && localCardsParsed[setCode].length > 0) {
        const localSet = localCardsParsed[setCode];
        setData(localSet);
      } else {
        fetch("https://api.pokemontcg.io/v2/cards?&orderBy=number&q=set.id:" + setId)
        .then((response) => response.json())
        .then((json) => {
          let localCardsMapped: CardType[] = [];
          json.data.map((card: { [key: string]: any }) => {
            if (card.tcgplayer?.prices) {
              Object.keys(card.tcgplayer.prices).sort().map((variant) => {
                localCardsMapped.push(formatCardsData(card, variant))
              });
            } else {
              localCardsMapped.push(formatCardsData(card, "normal"))
            }
          });
          setData(localCardsMapped)
          localCardsParsed[setCode] = localCardsMapped;
          localStorage.setItem("cards", JSON.stringify(localCardsParsed));
        });
      }
    }
  }, [setId, setCode]);

  const formatCardsData = (card: { [key: string]: any }, variant: string): CardType => {
    return ({
      id: card.id,
      variant: variant,
      image: card.images.small,
      hasCard: false,
      language: "eng"
    })
  }

  const setCards = (cards: CardType[]) => setData(cards);

  const handleHasCardAction = (index: number, hasCard: boolean) => {
    if (setCode) {
      const updatedCards = [...data];
      updatedCards[index].hasCard = hasCard;
      if (!hasCard) {
        updatedCards[index].language = "eng";
      }
      setData(updatedCards);
    }
  }

  const addCard = (index: number) => handleHasCardAction(index, true);

  const removeCard = (index: number) => handleHasCardAction(index, false);

  const changeLanguage = (index: number) => {
    if (setCode) {
      const updatedCards = [...data];
      updatedCards[index].language = updatedCards[index].language === "eng" ? "jap" : "eng";
      setData(updatedCards);
    }
  }

  const changePageSize = (size: PageSize) =>  setPageSize(size);

  return {
    data: [data, setCards],
    pageSize,
    addCard,
    removeCard,
    changeLanguage,
    changePageSize,
  };
}

export default useCards;