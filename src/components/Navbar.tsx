import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../constants";

import close from "../assets/close.svg";
import menu from "../assets/hamburguer.svg";
import logo from "../assets/logo.svg";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <nav className={
            `px-6 w-full flex items-center py-5 fixed bg-gradient-to-t from-zinc-900 to-zinc-700 text-white top-0 z-10 text-slate-800`
        }>
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <NavLink
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => {
                        window.scrollTo(0,0)
                    }}
                >
                    <img src={logo} alt="logo" className="w-9 h-9 object-contain"/>
                    <p className="text-[18px] font-bold cursor-pointer">
                        TheJollyDrawker
                    </p>
                </NavLink>
                <ul className="list-none hidden sm:flex flex-row gap-10">
                    {
                        navLinks.map((link) => (
                            <li
                                className="transition ease-in-out transform hover:scale-110"
                                key={link.id}
                            >
                                <NavLink className={({isActive}) =>
                                        isActive ? "font-bold text-indigo-200" : ""
                                    } to={link.id}
                                >
                                    {link.title}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>

                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <img src={toggle ? close : menu } alt="menu"
                    className="w-[28px] h-[28px] object-contain cursor-pointer"
                    onClick={() => setToggle(!toggle)} />

                    <ul className={`${!toggle ? 'opacity-0' : 'opacity-1'} flex p-6 bg-gradient-to-r from-zinc-600 to-zinc-800 absolute right-0 top-20 min-w-[240px] mx-4 my-2 rounded-md flex-col gap-4 transition ease-in`}>
                    {
                        navLinks.map((link) => (
                            <li
                                className="transition ease-in-out transform hover:scale-110"
                                key={link.id}
                            >
                                <NavLink className={({isActive}) =>
                                        isActive ? "font-bold text-indigo-200" : ""
                                    } 
                                    onClick={() => setToggle(!toggle)}
                                    to={link.id}
                                >
                                    {link.title}
                                </NavLink>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar