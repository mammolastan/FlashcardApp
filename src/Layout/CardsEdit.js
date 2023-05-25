import React, { useState, useEffect } from "react";
import Breadcrumbs from "./Breadcrumbs";
import {
  Link,
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom";
import { updateCard } from "../utils/api";
import FormCards from "./FormCards.js";

function CardsEdit({ thisDeck, setThisDeck, getDeck }) {
  let history = useHistory();
  const params = useParams();
  const thisCardNumber = Number(params.cardId);
  const thisCard = thisDeck.cards.find(
    (card, index) => card.id === thisCardNumber
  );
  const [formData, setFormdata] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const front = event.target.front.value;
    const back = event.target.back.value;
    const updatedCard = { ...thisCard, ...formData };
    const updatedCards = [...thisDeck.cards];
    updatedCards[thisCardNumber - 1] = updatedCard;
    const updatedDeck = { ...thisDeck, cards: updatedCards };

    async function postnewCard() {
      const response = await updateCard(updatedCard);
      
      getDeck();
      history.push(`/decks/${thisDeck.id}`);
    }
    postnewCard();
  };

  useEffect(() => {
    setFormdata({ front: thisCard?.front, back: thisCard?.back });
  }, []);

  return (
    <>
      <div className="container">
        <Breadcrumbs path={[thisDeck.name, "Edit Card"]} />
        <h2>{thisDeck.name}: Edit Card</h2>

        <FormCards
          formData={formData}
          setFormdata={setFormdata}
          handleSubmit={handleSubmit}
          thisDeckId={thisDeck.id}
        />
      </div>
    </>
  );
}

export default CardsEdit;
