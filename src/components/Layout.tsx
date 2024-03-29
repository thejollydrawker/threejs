import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
    return <div className="bg-zinc-900">
        <Navbar />
        <main>
            <Outlet />
        </main>
    </div>
}