import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteDeck, deleteCard } from "../utils/api";

function ButtonDelete({ setThisDeck, thisDeck, id, type }) {
  let history = useHistory();
  const [value, setValue] = useState(0); // integer state
  //create your forceUpdate hook
  const forceUpdate = () => {
    return () => setValue((value) => value + 1); // update state to force render
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      if (type === "deck") {
        async function deletethisDeck() {
          try {
            const response = await deleteDeck(id);
          } catch (error) {
            console.log(error);
          }
        }
        deletethisDeck();
      } else if (type == "card") {
        async function deletethisCard() {
          try {
            const response = await deleteCard(id);
            const updatedCards = thisDeck.cards.filter((card) => card.id != id);
            setThisDeck({ ...thisDeck, cards: [updatedCards] });
          } catch (error) {
            console.log(error);
          }
        }
        deletethisCard();
      }
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger text-right"
      onClick={handleDelete}
    >
      <span className="oi oi-trash"></span>
    </button>
  );
}

export default ButtonDelete;
