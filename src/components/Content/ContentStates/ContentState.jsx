import React from "react";

import './ContentState.css'

export const ContentState = (props) => {
    return (
        <div className="content-wrapper">
            <div className="initialSearchIcon">
                {props.image}
            </div>
            <div className="initialText">{props.text}</div>
        </div>
    );
};