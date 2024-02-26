import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
    return <main className="bg-gradient-to-b from-gray-700 to-gray-900">
        <Navbar />
        <main>
            <Outlet />
        </main>
    </main>
}