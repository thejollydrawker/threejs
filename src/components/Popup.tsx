import React from "react";

const rederContent: {[key: number]: any} = {
    1: (
        <h1>Welcome to <span className="font-bold">TheJollyDrawker</span> Planetarium! 🪐</h1>
    ),
    2: (
        <h1>✨Embark on an unforgettable cosmic journey! Explore the wonders of the universe as you gaze upon mesmerizing stars, planets, and galaxies.✨</h1>
    ),
    3: (
        <div className="flex flex-col gap-5">
            <h1>From awe-inspiring space tours to thrilling educational programs, TheJollyDrawker Planetarium is your gateway to the cosmos. Join us and let your imagination soar among the stars!</h1>
            <button className="max-w-max py-2 px-3 bg-indigo-700 text-sm font-bold rounded-md transition ease-in-out transform hover:scale-110">🌎 More info</button>
        </div>
    )
}

const Popup = ({ currentStage } : {currentStage: number}) => {
    return rederContent[currentStage] || null;
}

export default Popup;