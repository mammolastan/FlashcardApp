import React, {useState} from "react";
import Breadcrumbs from "./Breadcrumbs";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { createCard } from "../utils/api";
import FormCards from "./FormCards";

function CardsAdd({ thisDeck, setThisDeck, getDeck }) {
  const [formData, setFormdata] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    const front = event.target.front.value;
    const back = event.target.back.value;
    const newCard = { front: front, back: back, deckId: thisDeck.id };
    setThisDeck({ ...thisDeck, cards: [...thisDeck.cards, newCard] });
    event.target.reset();
    async function postnewCard() {
      const response = await createCard(thisDeck.id, newCard);
      getDeck();
    }
    postnewCard();
  };
  console.log("thisDeck in CardsAdd");
  console.log(thisDeck);
  return (
    <>
      <div className="container">
        <Breadcrumbs path={[thisDeck.name, "Add Card"]} />
        <h2>{thisDeck.name}: Add Card</h2>

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

export default CardsAdd;
