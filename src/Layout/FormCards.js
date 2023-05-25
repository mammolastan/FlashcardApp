import React from "react";
import { Link } from "react-router-dom";

function FormCards({ formData, setFormdata, handleSubmit, thisDeckId }) {
  const changeHandler = ({ target }) => {
    setFormdata({ ...formData, [target.name]: target.value });
  };

  return (
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
      <Link to={`/decks/${thisDeckId}`}>
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
  );
}
export default FormCards;
