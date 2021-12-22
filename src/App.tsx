import React, { useEffect, useState, createContext } from 'react'
import Nav from './components/Nav'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import Module from './components/Module'
import Home from './components/Home'
import Lesson from './components/Lesson'
import { ICourseData } from './util/types'
import { getData } from './util/fetch'
import { isDev } from './util/isDev'

export const AppContext = createContext({})

const App: React.FC = () => {
    const [titlePath, setTitlePath] = useState('')
    const [title, setTitle] = useState('')
    const [course, setCourse] = useState<ICourseData>()

    useEffect(() => {
        window.api.send('toMain', '_')
        window.api.receive('fromMain', async (data: ICourseData) => {
            setTitlePath(data.course)
            setCourse(data)
        })
    }, [])

    try {
        getData(
            `${isDev() ? '../../assets' : titlePath}/modules/index.json`,
            'json'
        )
            .then((res) => {
                setTitle(res.title)
            })
            .catch((err) => {
                console.error(err)
            })
    } catch (error) {
        console.error(error)
    }

    return course ? (
        <AppContext.Provider value={{ course }}>
            <section className="px-10 py-4">
                
                <img className="w-screen" src="../assets/pattern-stripe2_larger_copy-min.jpg"></img>
                <main className="flex flex-row mt">
                
                    <BrowserRouter>
                        
                        <Nav title={title} />
                        <Switch>
                            <Redirect exact from="/index.html" to="/" />
                            <Route exact path="/" component={Home} />
                            <Route exact path="/modules/:id" component={Lesson} />
                            <Route
                                exact
                                path="/modules/:id/:videoID"
                                component={Module}
                            />
                        </Switch>
                    </BrowserRouter>
                    
                </main>  
                
                <img className="w-screen" src="../assets/pattern-stripe2_larger_copy-min.jpg"></img>  
            </section>
            
            
        </AppContext.Provider>
    ) : (
        <>Loading...</>
    )
}

export default App
