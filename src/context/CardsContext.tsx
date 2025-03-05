import React from "react";
import { CardType, PageSize } from "../types";

const CardsContext = React.createContext<{
  cards: CardType[];
  pageSize: PageSize,
  setCards: (cards: CardType[]) => void;
  addCard: (index: number) => void;
  removeCard: (index: number) => void;
  changeLanguage: (index: number) => void;
  changePageSize: (pageSize: PageSize) => void;
}>({
  cards: [],
  pageSize: 9,
  setCards: () => {},
  addCard: () => {},
  removeCard: () => {},
  changeLanguage: () => {},
  changePageSize: () => {},
});

export default CardsContext;