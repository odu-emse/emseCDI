import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import { IModuleData } from '../util/types'
import MenuItem from './MenuItem'

interface INav {
    title: string
}

const Nav = ({ title }: INav) => {
    const value = useContext(AppContext)
    const { course }: [IModuleData] = value
    const { modules } = course

    return modules.length !== 0 ? (
        <nav className="flex flex-col lg:w-1/5 w-1/4 min-h-screen bg-gray-100 shadow-xl border-r-2 border-gray-200 py-2">
            <Link to="/" className="mx-auto font-bold text-2xl">
                <h1>{title}</h1>
            </Link>
            <ul>
                {modules.map((mod: IModuleData, index: number) => (
                    <MenuItem index={index} key={index} module={mod} />
                ))}
            </ul>
        </nav>
    ) : (
        <>Loading...</>
    )
}

export default Nav
