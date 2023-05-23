import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { createCard } from "../utils/api";

function CardsAdd({ thisDeck,setThisDeck }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const front = event.target.front.value;
    const back = event.target.back.value;
    const newCard = { front: front, back: back, deckId: thisDeck.id };
    setThisDeck({...thisDeck, cards:[...thisDeck.cards,newCard]})
    event.target.reset();
    async function postnewCard() {
      const response = await createCard(thisDeck.id, newCard);
      console.log("response:");
      console.log(response);
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

        <form onSubmit={handleSubmit}>
          <h5>Front:</h5>
          <textarea
            name="front"
            placeholder="Front side of card"
          ></textarea>
          <h5>Back:</h5>
          <textarea
            name="back"
            placeholder="Front side of card"
          ></textarea>
          <Link to={`/decks/${thisDeck.id}`}>
            <button
              type="button"
              className="btn btn-secondary"
            >
              Done
            </button>
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default CardsAdd;
