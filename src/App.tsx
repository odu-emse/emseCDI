import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import {
    HashRouter,
    Link,
    Route,
    Routes as Switch,
    BrowserRouter,
} from 'react-router-dom'
import Module from './components/Module'
import Home from './components/Home'
import { getData } from './util/fetch'
import Lesson from './components/Lesson'

const App: React.FC = () => {
    const [title, setTitle] = useState('')

    useEffect(() => {
        const seed = `../../assets/modules/index.json`
        getData(seed, 'json').then((data) => {
            setTitle(data.title)
        })
    })

    return (
        <main className="flex flex-row">
            <BrowserRouter>
                <Nav title={title} />
                <Switch>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/modules/:id" element={<Lesson />} />
                    <Route path="/modules/:id/:videoID" element={<Module />} />
                </Switch>
            </BrowserRouter>
        </main>
    )
}

export default App
