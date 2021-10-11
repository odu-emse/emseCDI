import { ipcRenderer } from 'electron'
import React, { useEffect, useState } from 'react'

function App() {
    const getDir = () => {
        //TODO: use built in useEffect to fetch directory structure upon load
        // ipcRenderer.on('directory', (event, args) => {
        //     console.log(event)
        // })
    }

    return (
        <div className=" flex flex-col justify-center items-center h-screen bg-gray-800 space-y-4">
            <h1>Hello</h1>
            <button onClick={() => getDir()}>Get directories</button>
        </div>
    )
}

export default App
