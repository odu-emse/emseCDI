import React from 'react'
import { Link } from 'react-router-dom'
import { IModule } from '../util/types'

interface Props {
    open: boolean
    module: IModule
    directoryIndex: number
}

const SubMenuItem: React.FC<Props> = ({ open, module, directoryIndex }) => {
    return (
        <>
            <Link
                to={`/modules/${directoryIndex}/${module.name.replace(
                    module.ext,
                    ''
                )}`}
            >
                <li
                    className={`pl-8 transition-all hover:bg-gray-300 cursor-pointer ${
                        open ? 'block' : 'hidden'
                    }`}
                >
                    {module.name.replace(module.ext, '')}
                </li>
            </Link>
        </>
    )
}

export default SubMenuItem
