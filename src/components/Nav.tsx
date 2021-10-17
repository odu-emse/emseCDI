import React, { useEffect, useState } from 'react'
import { getData } from '../helper/fetch'
import {Link} from 'react-router-dom'

interface INav{
    title: string
}

const Nav = ({title}:INav) => {
    const [dir, setDir] = useState([])
    useEffect(() => {
      // @ts-ignore
      window.api.send("toMain", "_");
      // @ts-ignore
      window.api.receive("fromMain", (data:any) => {
        console.log(data)
        // @ts-ignore
        setDir(dir => [...dir, data]);
      });
    }, [])

    return (
        <nav className="flex flex-col lg:w-1/5 w-1/4 min-h-screen bg-gray-100 shadow-xl border-r-2 border-gray-200 py-2">
            <Link to="/home" className="mx-auto font-bold text-2xl">
                <h1>{title}</h1>
            </Link>
            <ul className="">
              {
                dir.map((dirr, index) => (
                  <Link to={`/modules/${index + 1}`} key={dirr}>
                    <li className="px-4 py-2 hover:bg-gray-300">Module {dirr}</li>
                  </Link>
                ))
              }
            </ul>
        </nav>
    )
}

export default Nav
