import React from "react";

import "./Repository.css";

export const Repository = (props) => {
  return (
    <div className="repository-wrapper">
      <div className="repository-title">
        <a href={props.url} target="_blank">
          {props.name}
        </a>
      </div>
      <div className="repository-description">{props.description}</div>
    </div>
  );
};