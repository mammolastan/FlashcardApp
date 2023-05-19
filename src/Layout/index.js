import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "./Decks";
import { listDecks } from "../utils/api";
import { Route, Switch, Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumbs from "./Breadcrumbs";
import DecksCreate from "./DecksCreate";
import DeckSingle from "./DeckSingle";
import "./index.css"

function Layout() {

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <div className="container">
            <Link to="/decks/new">
              <button type="button" className="btn btn-secondary">
                <span className="oi oi-plus"></span> Create New
              </button>
            </Link>
            <Decks />
          </div>
        </Route>
        <Route path="/decks">
          <Decks />
        </Route>
      
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default Layout;
