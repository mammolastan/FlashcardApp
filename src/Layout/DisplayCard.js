import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ButtonDelete from "./ButtonDelete";
import ButtonStudy from "./ButtonStudy";

function DisplayCard({name, description, cards, id}) {  
  return (
    <div className="card">
      <div className="card-body">
        <small className="text-muted text-right" style={{float:"right"}}>{cards.length} cards</small>

        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <Link to={`/decks/${id}`}><button type="button" className="btn btn-secondary">
          <span className="oi oi-eye"></span> View
        </button>
        </Link>
        <ButtonStudy id={id}/>

        <ButtonDelete id={id} type="deck"/>
      </div>
    </div>
  );
}

export default DisplayCard;