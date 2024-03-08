import React from "react";
import { NavLink } from "react-router-dom";
import arrow from "../assets/arrow-back.svg";

const About = () => {
    return (
        <div className="w-full h-screen px-8 text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-6">About</h1>
            <p>Hi! 👋 This is a little project that helped me test out <a className="font-bold underline text-indigo-200" href="https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene">Three.js</a>, <a className="font-bold underline text-indigo-200" href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction">React-three-fiber</a> and <a className="font-bold underline text-indigo-200" href="https://github.com/pmndrs/drei#readme">React-three-drei</a>.</p>
            <p className="my-4">This course on Youtube is what I followed to get an idea on how to get started with these libraries:</p>
            <iframe width="300" height="220" allowFullScreen={false} src="https://www.youtube.com/embed/FkowOdMjvYo?si=PY5QuRaotxTRxuZr" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            <NavLink to="/" className="flex whitespace-nowrap mt-5 cursor-pointer font-bold underline decoration-3 transition ease-in-out transform hover:scale-110"><img src={arrow} alt="arrow back" className="mr-2" />Go back</NavLink>
        </div>
    );
}

export default About;