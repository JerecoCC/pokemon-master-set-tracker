import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CardType, SetType, ViewModeType } from "../../types";
import SetHeader from "./components/SetHeader";
import ShowAllView from "./views/ShowAllView";
import MissingView from "./views/MissingView";
import CardsContext from "../../context/CardsContext";
import useCards from "../../hooks/useCards";
import JapaneseView from "./views/JapaneseView";
import ModalContext from "../../context/ModalContext";
import useCardModal from "../../hooks/useCardModal";
import CardModal from "./components/CardModal";
let localStorage = require("localStorage");

const SetPage = () => {
  const { setCode } = useParams();

  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<ViewModeType>("all");
  const [set, setSet] = useState<SetType>({});

  const {
    data: [cards, setCards],
    isLoading,
    pageSize,
    addCard, 
    removeCard, 
    changeLanguage,
    changePageSize,
  } = useCards(set.id || "", setCode);

  const {
    isOpen,
    openModal,
    closeModal,
    cardId,
    setCard,
   } = useCardModal();

  useEffect(() => {
    const localCards = localStorage.getItem("cards");
    if (!localCards) {
      localStorage.setItem("cards", JSON.stringify({}))
    }
  }, []);

  useEffect(() => {
    fetch("https://api.pokemontcg.io/v2/sets?q=ptcgoCode:" + setCode)
      .then((response) => response.json())
      .then((json) => {
        setSet(json.data[0]);
      });
  }, [setCode]);

  useEffect(() => {
    if (setCode && cards.length > 0) {
      const localCards = localStorage.getItem("cards");
      const localCardsParsed: { [key: string]: CardType[] } = localCards && JSON.parse(localCards);
      localCardsParsed[setCode] = cards;
      localStorage.setItem("cards", JSON.stringify(localCardsParsed));
    }
  }, [cards]);

  return (
    <ModalContext.Provider value={{
      isOpen,
      openModal,
      closeModal,
      cardId,
      setCard,
    }}>
      <CardsContext.Provider value={{
        cards,
        pageSize,
        setCards,
        addCard,
        removeCard,
        changeLanguage,
        changePageSize,
      }}>
        <div className="page">
          <SetHeader
            data={set}
            viewMode={viewMode}
            onBackToSets={() => navigate("/")}
            onChangeView={(view: ViewModeType) => setViewMode(view)}
          />
          <hr />
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {viewMode === "all" && (
                <ShowAllView />
              )}
              {viewMode === "missing" && (
                <MissingView />
              )}
              {viewMode === "japanese" && (
                <JapaneseView />
              )}
            </>
          )}
          
          <CardModal />
        </div>
      </CardsContext.Provider>
    </ModalContext.Provider>
  );
};

export default SetPage;
