import React from "react";
import {Link} from "react-router-dom";

function Breadcrumbs({ path }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li key="100" className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"></span> Home</Link>
        </li>
        {path ? path.map((page, index)=>(
            <li key={index} className="breadcrumb-item"> {page} </li>    
        )): <div></div>}
        
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
