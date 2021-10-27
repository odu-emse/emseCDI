import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SubMenuItem from './SubMenuItem'

interface Props {
    index: number
    dirr: string
}

const MenuItem: React.FC<Props> = ({ index, dirr }) => {
    const [open, setOpen] = useState(true)
    //array that holds the path to the videos inside of the individual module folder
    const [videos, setVideos] = useState(['1', '2', '3'])

    const [dir, setDir] = useState([])

    useEffect(() => {
        setOpen(false)

        // @ts-ignore
        window.api.send('getModules', '_')
        // @ts-ignore
        window.api.receive('toModules', (data: any) => {
            console.log(data)
            // @ts-ignore
            setDir((dir) => [...dir, data])
        })
    }, [])

    return (
        <>
            <Link to={`/modules/${dirr}/${dirr}`}>
                <li
                    className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
                    key={dirr}
                    onClick={() => setOpen(!open)}
                >
                    Module {dirr}
                </li>
            </Link>
            {dir.map((vid, index) => (
                <SubMenuItem open={open} key={index} dirr={dirr} vid={vid} />
            ))}
        </>
    )
}

export default MenuItem
