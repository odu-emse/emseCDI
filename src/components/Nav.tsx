import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItem from './MenuItem'

interface INav {
    title: string
}

const Nav = ({ title }: INav) => {
    const [dir, setDir] = useState([])

    useEffect(() => {
        // @ts-ignore
        window.api.send('toMain', '_')
        // @ts-ignore
        window.api.receive('fromMain', (data: any) => {
            setDir(data)
        })
    }, [])

    return (
        <nav className="flex flex-col lg:w-1/5 w-1/4 min-h-screen bg-gray-100 shadow-xl border-r-2 border-gray-200 py-2">
            <Link to="/home" className="mx-auto font-bold text-2xl">
                <h1>{title}</h1>
            </Link>
            <ul>
                {dir.map((dirr, index) => (
                    <MenuItem index={index} key={index} dirr={dirr} />
                ))}
            </ul>
        </nav>
    )
}

export default Nav
