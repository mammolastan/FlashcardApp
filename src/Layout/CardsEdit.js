import React, { useState, useEffect } from "react";
import Breadcrumbs from "./Breadcrumbs";
import {
  Link,
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom";
import { updateCard } from "../utils/api";

function CardsEdit({ thisDeck,setThisDeck }) {
  let history = useHistory();
  const params = useParams();
  const thisCardNumber = Number(params.cardId);
  const thisCard = thisDeck.cards.find((card)=>card.id===thisCardNumber);
  const [formData, setFormdata] = useState({});
  console.log("thisDeck:")
  console.log(thisDeck)
  console.log("My Logic:")
  console.log(thisDeck.cards[0].id)

  const changeHandler = ({ target }) => {
    setFormdata({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const front = event.target.front.value;
    const back = event.target.back.value;
    const updatedCard = { ...thisCard, ...formData };
    async function postnewCard() {
      const response = await updateCard(updatedCard);
      console.log("New updatedCard response:");
      console.log(response);
      
      history.push(`/decks/${thisDeck.id}`);
    }
    postnewCard();
  };

  useEffect(() => {
    console.log("In CardsEdit.");
    console.log("thisCard:");
    console.log(thisCard);
    console.log("thisCardNumber")
    console.log(thisCardNumber)
    setFormdata({ front: thisCard?.front, back: thisCard?.back });
  }, []);

  return (
    <>
      <div className="container">
        <Breadcrumbs path={[thisDeck.name, "Edit Card"]} />
        <h2>{thisDeck.name}: Edit Card</h2>

        <form onSubmit={handleSubmit}>
          <h5>Front:</h5>
          <textarea
            name="front"
            placeholder="Front side of card"
            onChange={changeHandler}
            value={formData.front}
          ></textarea>
          <h5>Back:</h5>
          <textarea
            name="back"
            placeholder="Front side of card"
            onChange={changeHandler}
            value={formData.back}
          ></textarea>
          <Link to={`/decks/${thisDeck.id}`}>
            <button
              type="button"
              className="btn btn-secondary"
            >
              Cancel
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

export default CardsEdit;
