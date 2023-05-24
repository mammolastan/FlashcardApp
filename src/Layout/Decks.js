import React from "react";
import DisplayCard from "./DisplayCard";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumbs from "./Breadcrumbs";
import DecksCreate from "./DecksCreate";
import { useState, useEffect } from "react";
import { listDecks } from "../utils/api";
import DeckSingle from "./DeckSingle";

function Decks() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    async function getDecks() {
      try {
        const response = await listDecks();
        setDecks(response);
      } catch (error) {}
    }
    getDecks();
  }, []);
  return (
    <Switch>
      <Route
        exact
        path="/"
      >
        <div>
          {decks ? (
            decks.map((deck, index) => <DisplayCard {...deck} decks={decks} setDecks={setDecks} />)
          ) : (
            <p>No Decks</p>
          )}
        </div>
      </Route>
      <Route
        exact
        path="/decks/new"
      >
        <div className="container">
          <Breadcrumbs path={["Create deck"]} />
          <DecksCreate
            decks={decks}
            setDecks={setDecks}
          />
        </div>
      </Route>
      <Route path="/decks/:deckId">
        <DeckSingle />
      </Route>
      <Route path="decks/:deckId/study">
        <p>Nothing to see here</p>
      </Route>
    </Switch>
  );
}

export default Decks;
