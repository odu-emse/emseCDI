import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    open: boolean
    dirr: [string]
    vid: number
}

const SubMenuItem: React.FC<Props> = ({ open, dirr, vid, video, module }) => {
    useEffect(() => {}, [open])
    return (
        <>
             <Link to={`/modules/${module}/${video}`}>
            <li
                className={`pl-8 transition-all hover:bg-gray-300 cursor-pointer ${open ? 'block' : 'hidden'}`}
            >
                Video {vid}
            </li>
             </Link>
        </>
    )
}

export default SubMenuItem
