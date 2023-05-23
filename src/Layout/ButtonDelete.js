import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteDeck, deleteCard } from "../utils/api";

function ButtonDelete({ setThisDeck, thisDeck, id, type }) {
  let history = useHistory();
  const [value, setValue] = useState(0); // integer state

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
      } else if (type === "card") {
        async function deletethisCard() {
          console.log("in deletethisCard()");
          try {
            const updatedCards = thisDeck.cards.filter((card) => card.id != id);
            setThisDeck( {...thisDeck, cards: updatedCards });
            const response = await deleteCard(id);
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
