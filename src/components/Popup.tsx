import React from "react";

const rederContent: {[key: number]: any} = {
    1: (
        <h1>1</h1>
    ),
    2: (
        <h1>2</h1>
    ),
    3: (
        <h1>3</h1>
    ),
    4: (
        <h1>4</h1>
    )
}

const Popup = ({ currentStage } : {currentStage: number}) => {
    return rederContent[currentStage] || null;
}

export default Popup;