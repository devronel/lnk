import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <>
            <div className=" min-h-screen h-auto pt-[3.75rem] pb-4 flex items-center justify-center">
                <div className="py-3 border-b border-lnk-gray fixed top-0 left-0 right-0 z-50 bg-lnk-white">
                    <nav className="max-w-[80rem] w-[90%] mx-auto flex items-center justify-between">
                        <Link to="/" className=" font-bold text-lg text-lnk-orange">Lnk</Link>
                    </nav>
                </div>
                <main className=" w-full">
                    <div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    )
}

export default AuthLayout