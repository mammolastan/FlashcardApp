import React, { useState, useEffect } from "react";
import Breadcrumbs from "./Breadcrumbs";
import {
  Link,
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom";
import { updateCard } from "../utils/api";

function CardsEdit({ thisDeck }) {
  let history = useHistory();
  const params = useParams();
  const thisCardNumber = params.cardId - 1;
  const thisCard = thisDeck.cards[thisCardNumber];
  const [formData, setFormdata] = useState({});

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
      console.log("response:");
      console.log(response);
      history.push(`/decks/${thisDeck.id}`);
    }
    postnewCard();
  };

  useEffect(() => {
    setFormdata({ front: [thisCard.front], back: [thisCard.back] });
  }, []);

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
