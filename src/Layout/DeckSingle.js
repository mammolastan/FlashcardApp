import React, { useEffect, useState } from "react";
import {
  useParams,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom/cjs/react-router-dom";

import Breadcrumbs from "./Breadcrumbs";
import { readDeck } from "../utils/api";
import ButtonDelete from "./ButtonDelete";
import CardsAdd from "./CardsAdd";
import "./DeckSingle.css";
import ButtonStudy from "./ButtonStudy";
import DecksEdit from "./DecksEdit";
import CardsEdit from "./CardsEdit";

function DeckSingle() {
  const params = useParams();
  const history = useHistory();
  const [thisDeck, setThisDeck] = useState({});
  const [cardsTotal, setCardsTotal] = useState(0);
  const [thisCardNumber, setThisCardNumber] = useState(0);
  const [cardSide, setCardSide] = useState("front");
  const [atEnd, setAtEnd] = useState(false);
  let deckExists = thisDeck.id;

  async function getDeck() {
    try {
      console.log("in async function get deck");
      console.log("thisDeck");
      console.log(thisDeck);
      const response = await readDeck(params.deckId);
      deckExists = true;
      setThisDeck(response);
    } catch (error) {
      deckExists = false;
      console.log(error);
    }
  }

  const handleFlip = () => {
    cardSide === "front" ? setCardSide("back") : setCardSide("front");
  };

  const handleNext = () => {
    // If atEnd = true, prompt user
    if (atEnd) {
      if (window.confirm("Would you like to restart the deck?")) {
        history.go(0);
      } else {
        history.push("/");
      }
    } else {
      // If not yet at end, set side to front and increment card number
      setCardSide("front");
      !atEnd ? setThisCardNumber(thisCardNumber + 1) : console.log();
    }
  };

  // Runs after thisCardNumber is set
  useEffect(() => {
    // If we are at the end, set atEnd=true
    if (thisCardNumber === cardsTotal - 1) {
      setAtEnd(true);
    }
  }, [thisCardNumber]);

  useEffect(() => {
    console.log("in the one-time cleanup useEffect in DeckSingle");
    getDeck();
  }, [window.location]);

  useEffect(() => {
    if (thisDeck.cards) {
      setCardsTotal(thisDeck.cards.length);
      console.log("in the thisDeck Depeendency");
      console.log("thisDeck");
      console.log(thisDeck);
    }
  }, [thisDeck]);

  return deckExists ? (
    <Switch>
      <Route
        path="/decks/:deckId"
        exact
      >
        <div className="container">
          <Breadcrumbs path={[thisDeck.name]} />
          <h2>{thisDeck.name}</h2>
          <p>{thisDeck.description}</p>
          <Link to={`/decks/${thisDeck.id}/edit`}>
            <button
              type="button"
              className="btn btn-secondary"
            >
              <span className="oi oi-eye"></span> Edit
            </button>
          </Link>
          <ButtonStudy id={thisDeck.id} />
          <Link to={`/decks/${thisDeck.id}/cards/new`}>
            <button
              type="button"
              className="btn btn-primary"
            >
              <span className="oi oi-briefcase"></span> Add Cards
            </button>
          </Link>
          <ButtonDelete
            thisDeck={thisDeck}
            setThisDeck={setThisDeck}
            id={thisDeck.id}
            type="deck"
          />

          <h2> Cards </h2>

          {thisDeck.cards.length > 2 ? (
            thisDeck.cards.map((card) => (
              <>
                <table>
                  <tbody>
                    <tr key={card.id}>
                      <td>{card.front}</td>
                      <td>{card.back}</td>
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        align="right"
                      >
                        <Link
                          to={`/decks/${thisDeck.id}/cards/${card.id}/edit`}
                        >
                          <button
                            type="button"
                            className="btn btn-secondary"
                          >
                            <span className="oi oi-eye"></span> Edit
                          </button>
                        </Link>
                        <ButtonDelete
                          id={card.id}
                          type="card"
                          thisDeck={thisDeck}
                          setThisDeck={setThisDeck}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            ))
          ) : (
            <p>
              This deck has been created, but there are not enough cards yet. Please add
              cards.
            </p>
          )}
        </div>
      </Route>
      <Route path={`/decks/:deckId/study`}>
        <div className="container">
          <Breadcrumbs path={["This deck", "study"]} />
          <h2>{thisDeck.name}</h2>

          {thisDeck.cards.length > 2 ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Card {thisCardNumber + 1} of {cardsTotal}
                </h5>
                <p className="card-text">
                  {thisDeck.cards[thisCardNumber][cardSide]}
                </p>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleFlip}
                >
                  Flip
                </button>
                {cardSide === "back" ? (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleNext}
                  >
                    {atEnd ? "Restart" : "Next"}
                  </button>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          ) : (
            <>
              <p>
                Not enough cards. You only have {thisDeck.length} cards. Please
                add 3 or more.
              </p>
              <button>Add Cards</button>
            </>
          )}
        </div>
      </Route>
      <Route path="/decks/:deckId/cards/new">
        <CardsAdd
          setThisDeck={setThisDeck}
          thisDeck={thisDeck}
          getDeck={getDeck}
        />
      </Route>
      <Route path="/decks/:deckId/edit">
        <DecksEdit
          thisDeck={thisDeck}
          setThisDeck={setThisDeck}
          getDeck={getDeck}
        />
      </Route>
      <Route path="/decks/:deckId/cards/:cardId/edit">
        <CardsEdit
          thisDeck={thisDeck}
          setThisDeck={setThisDeck}
          getDeck={getDeck}
        />
      </Route>
    </Switch>
  ) : (
    <p>No deck at this ID exists</p>
  );
}

export default DeckSingle;
