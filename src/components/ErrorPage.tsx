import React from "react";
import { NavLink } from "react-router-dom";
import  arrow from "../assets/arrow-back.svg";

const ErrorPage = () => {
    return (
        <div className="w-full h-screen text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-6">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <NavLink to="/" className="flex whitespace-nowrap mt-5 cursor-pointer font-bold underline decoration-3"><img src={arrow} alt="arrow back" className="mr-2" />Go back</NavLink>
        </div>
    );
}

export default ErrorPage;