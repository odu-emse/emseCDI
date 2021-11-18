import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import {
    HashRouter,
    Link,
    Route,
    Switch,
    BrowserRouter,
} from 'react-router-dom'
import Module from './components/Module'
import Home from './components/Home'
import { getData } from './util/fetch'
import Lesson from './components/Lesson'
import { config } from './util/config'

const App: React.FC = () => {
    const [title, setTitle] = useState('')

    useEffect(() => {
        const seed = `${config.path}/index.json`
        getData(seed, 'json').then((data) => {
            setTitle(data.title)
        })
    })

    return (
        <main className="flex flex-row">
            <BrowserRouter>
                <Nav title={title} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/modules/:id" component={Lesson} />
                    <Route
                        exact
                        path="/modules/:id/:videoID"
                        component={Module}
                    />
                </Switch>
            </BrowserRouter>
        </main>
    )
}

export default App
