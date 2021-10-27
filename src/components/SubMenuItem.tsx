import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    open: boolean
    dirr: string
    vid: number
}

const SubMenuItem: React.FC<Props> = ({ open, dirr, vid }) => {
    useEffect(() => {}, [open])
    return (
        <>
            {/* <Link to={`/modules/${dirr}/${vid}`}> */}
            <li
                className={`pl-8 transition-all ${
                    open ? 'block' : 'hidden'
                } hover:bg-gray-300 cursor-pointer`}
            >
                Video {vid}
            </li>
            {/* </Link> */}
        </>
    )
}

export default SubMenuItem
