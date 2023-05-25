import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { updateDeck } from "../utils/api";

function DecksEdit({ thisDeck, setThisDeck,getDeck }) {
  const [formData, setFormdata] = useState({});
  let history = useHistory();

  const changeHandler = ({ target }) => {
    const newFormData = { ...formData, [target.name]: [target.value] };

    setFormdata({ ...formData, [target.name]: [target.value] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedDeck = { ...thisDeck, ...formData };
    setThisDeck(updatedDeck);

    async function pushDeck() {
      try {
        const response = await updateDeck(updatedDeck);
        history.push(`/decks/${thisDeck.id}`);
      } catch (error) {
        console.log(error);
      }
    }
    pushDeck();
  };

  useEffect(() => {
    setFormdata({ name: [thisDeck.name], description: [thisDeck.description] });
  }, []);

  return (
    <div className="container">
      <h2>Edit deck info</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Deck name:</label>
        <br />
        <textarea
          type="text"
          id="name"
          name="name"
          value={formData.name}
          placeholder="Deck name"
          onChange={changeHandler}
        ></textarea>
        <br />
        <br />
        <label htmlFor="description">Deck description:</label>
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
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default DecksEdit;
