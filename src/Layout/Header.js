import { Link } from "react-router-dom/cjs/react-router-dom.min";
import React from "react";

function Header() {
  return (
    <header className="jumbotron bg-dark">
      <div className="container text-white">
        <Link to="/"><h1 className="display-4">Flashcard-o-matic</h1></Link>
        <p className="lead">Discover The Flashcard Difference.</p>
      </div>
    </header>
  );
}

export default Header;
