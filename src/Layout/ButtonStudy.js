import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ButtonStudy({ id }) {
  return (
    <Link to={`/decks/${id}/study`}>
      <button
        type="button"
        className="btn btn-primary"
      >
        <span className="oi oi-briefcase"></span> Study
      </button>
    </Link>
  );
}

export default ButtonStudy;
