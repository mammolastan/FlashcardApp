import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DecksCreate({ decks, setDecks }) {
  const [formData, setFormdata] = useState({});
  let history = useHistory();

  const changeHandler = ({ target }) => {
    setFormdata({ ...formData, [target.name]: target.value });
  };

  const submitDeck = (event) => {
    event.preventDefault();
    const thisDeck = { ...formData };
    async function pushDeck() {
      try {
        const {id} = await createDeck(thisDeck);
        history.push(`/decks/${id}`);
      } catch (error) {}
    }
    pushDeck();
  };

  return (
    <div>
      <h2>Create Deck</h2>
      <form onSubmit={submitDeck}>
        <label for="name">Deck name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          placeholder="Deck name"
          onChange={changeHandler}
        />
        <br />
        <br />
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={changeHandler}
          placeholder="Brief description of deck"
        ></textarea>
        <br />
        <br />
        <Link to="/">
          <button
            type="button"
            class="btn btn-secondary"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          class="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default DecksCreate;
