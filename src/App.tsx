import { ipcRenderer } from 'electron'
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
import { getData } from './helper/fetch'
import * as electron from 'electron'

const App: React.FC = () => {
    const [title, setTitle] = useState('')

    useEffect(() => {
        const seed = `../../assets/modules/index.json`
        getData(seed, 'json').then((data) => {
            setTitle(data.title)
        })
    })
    const getDir = () => {
        //TODO: use built in useEffect to fetch directory structure upon load
        // ipcRenderer.send('message', 'ping')
        // electron.notificationApi.sendNotification('something')
    }

    return (
        <main className="flex flex-row">
            <BrowserRouter>
                <Nav title={title}/>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route path="/modules/:id" component={Module} />
                </Switch>
            </BrowserRouter>
        </main>
    )
}

export default App
