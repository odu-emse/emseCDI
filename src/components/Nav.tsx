import React, { useEffect, useState } from 'react'
import { getData } from '../helper/fetch'
import {Link} from 'react-router-dom'

interface INav{
    title: string
}

const Nav = ({title}:INav) => {

    return (
        <nav className="flex flex-col lg:w-1/5 w-1/4 min-h-screen bg-gray-100 shadow-xl border-r-2 border-gray-200 py-2">
            <Link to="/home" className="mx-auto font-bold text-2xl">
                <h1>{title}</h1>
            </Link>
            <ul className="">
                <Link to="/modules/1">
                    <li className="px-4 py-2 hover:bg-gray-300">Module 1</li>
                </Link>
                <Link to="/modules/2">
                    <li className="px-4 py-2 hover:bg-gray-300">Module 2</li>
                </Link>
                <Link to="/modules/3">
                    <li className="px-4 py-2 hover:bg-gray-300">Module 3</li>
                </Link>
                <Link to="/modules/4">
                    <li className="px-4 py-2 hover:bg-gray-300">Module 4</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav
