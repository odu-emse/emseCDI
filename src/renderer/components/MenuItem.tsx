import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SubMenuItem from './SubMenuItem'

interface Props {
    index: number
    dirr: {
        name: string
        videos: [string]
    }
}

const MenuItem: React.FC<Props> = ({ index, dirr }) => {
    const [open, setOpen] = useState(true)
    //array that holds the path to the videos inside of the individual module folder
    const [videos, setVideos] = useState()

    const [dir, setDir] = useState([])

    useEffect(() => {
        setOpen(false)
    }, [])

    return (
        <>
            <Link to={`/modules/${dirr.name}`}>
                <li
                    className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
                    key={dirr.name}
                    onClick={() => setOpen(!open)}
                >
                    Module {dirr.name}
                </li>
            </Link>
            {dirr.videos.map((vid, index) => (
                <SubMenuItem
                    open={open}
                    key={index}
                    module={dirr.name}
                    video={vid}
                />
            ))}
        </>
    )
}

export default MenuItem
