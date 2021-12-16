import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IModule, IModuleData } from '../util/types'
import SubMenuItem from './SubMenuItem'

interface Props {
    index: number
    module: IModuleData
}

const MenuItem: React.FC<Props> = ({ index, module }) => {
    const [open, setOpen] = useState(true)

    useEffect(() => {
        setOpen(false)
    }, [])

    return (
        <>
            <Link to={`/modules/${module.name}`}>
                <li
                    className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
                    key={index}
                    onClick={() => setOpen(!open)}
                >
                    Module {module.name}
                </li>
            </Link>
            {module.videos.map((vid: IModule, index: number) => (
                <SubMenuItem
                    open={open}
                    key={index}
                    directoryIndex={parseInt(module.name)}
                    module={vid}
                />
            ))}
        </>
    )
}

export default MenuItem
