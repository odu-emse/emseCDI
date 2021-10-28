import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SubMenuItem from './SubMenuItem'

interface Props {
    index: number
    dirr: object
}

const MenuItem: React.FC<Props> = ({ index, dirr }) => {
    const [open, setOpen] = useState(true)
    //array that holds the path to the videos inside of the individual module folder
    const [videos, setVideos] = useState()

    const [dir, setDir] = useState([])

    useEffect(() => {
        setOpen(false)

        // // @ts-ignore
        // window.api.send('getModules', '_')
        // // @ts-ignore
        // window.api.receive('toModules', (data: any) => {
        //     console.log(data)
        //     // @ts-ignore
        //     setDir((dir) => [...dir, data])
        // })
    }, [])

    return (
        <>
            <Link to={`/modules/${dirr.name}`}>
                <li
                    className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
                    key={dirr}
                    onClick={() => setOpen(!open)}
                >
                    Module {dirr.name}
                </li>
            </Link>
            {dirr.videos.map((vid, index) => (
                <SubMenuItem
                    open={open}
                    key={index}
                    dirr={dirr.videos[index]}
                    vid={vid}
                    module={dirr.name}
                    video={vid}
                />
            ))}
        </>
    )
}

export default MenuItem
