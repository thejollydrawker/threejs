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
            `px-6 w-full flex items-center py-5 fixed bg-gray-900 text-white top-0 z-1 text-slate-800`
        }>
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                                isActive ? "flex items-center gap-2" : "flex items-center gap-2"
                            }
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
                                key={link.id}
                            >
                                <a href={`#${link.id}`}>{link.title}</a>
                            </li>
                        ))
                    }
                </ul>

                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <img src={toggle ? close : menu } alt="menu"
                    className="w-[28px] h-[28px] object-contain cursor-pointer"
                    onClick={() => setToggle(!toggle)} />

                    <ul className={`${!toggle ? 'hidden' : 'flex'} p-6 bg-secondary absolute right-0 top-20 min-w-[240px] mx-4 my-2 rounded-md flex-col gap-4`}>
                    {
                        navLinks.map((link) => (
                            <li
                                key={link.id}
                            >
                                <a onClick={() => setToggle(!toggle)} href={`#${link.id}`}>{link.title}</a>
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