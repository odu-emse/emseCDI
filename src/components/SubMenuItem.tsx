import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    open: boolean
    video: string,
    module: string
}

const SubMenuItem: React.FC<Props> = ({ open, video, module }) => {
    useEffect(() => {}, [open])
    return (
        <>
            <Link to={`/modules/${module}/${video}`}>
                <li
                    className={`pl-8 transition-all hover:bg-gray-300 cursor-pointer ${
                        open ? 'block' : 'hidden'
                    }`}
                >
                    Video {video}
                </li>
            </Link>
        </>
    )
}

export default SubMenuItem
