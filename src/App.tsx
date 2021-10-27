import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import {
    HashRouter,
    Link,
    Route,
    Switch,
    BrowserRouter,
    Redirect,
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
                    <Route exact path="/">
                        <Redirect to="/home" /> : <Home />
                    </Route>
                    <Route exact path="/home" component={Home} />
                    <Route
                        path="/modules/:id/:videoID"
                        exact
                        render={(props) => <Module {...props} title={title} />}
                    />
                    <Route
                        path="/modules/:id/"
                        exact
                        component={Lesson}
                    />
                </Switch>
            </BrowserRouter>
        </main>
    )
}

export default App
