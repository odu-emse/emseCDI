import React, { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { getData } from '../util/fetch'
import Layout from './Layout'
import ReactPlayer from 'react-player'
import ModuleContent from './ModuleContent'
import FileSaver from 'file-saver'
import Button from './Button'
import Resources from './Resources'
import Exercises from './Exercises'
import { useParams } from 'react-router'

const Module: React.FC = (props) => {
    const [page, setPage] = useState('1')
    const [vid, setVid] = useState()
    const [post, setPost] = useState('# Hello')
    const [source, setSource] = useState('../../assets/modules/1/1.mp4')
    const [loading, setLoading] = useState(true)
    const [preview, setPreview] = useState('edit')
    const [notes, setNotes] = useState('')
    const [sideBySide, setSideBySide] = useState(false)
    const [active, setActive] = useState('Overview')
    const [dir, setDir] = useState([])

    const { id, videoID } = useParams()

    useEffect(() => {
        setPage(id)
        setVid(videoID)

        // @ts-ignore
        window.api.send('toMain', '_')
        // @ts-ignore
        window.api.receive('fromMain', (data: any) => {
            setDir(data)
        })

        let time
        let data

        //if student is viewing the module page and page is fully loaded
        //@ts-ignore
        // if(props.match.url.includes('modules') && !loading){
        //     let vid = document.getElementById('vid')
        //     //if user has visited the module page already set video time to saved one
        //     if(localStorage.getItem(`module${page}`)) {
        //         const localData = localStorage.getItem(`module${page}`)
        //         //@ts-ignore
        //         const data = JSON.parse(localData)
        //         //@ts-ignore
        //         vid.currentTime = parseInt(data.time) | 0
        //     }
        //     //create local storage object if not visited already
        //     else{
        //         let moduleTimes: object = {
        //             "time": 0,
        //         }
        //         localStorage.setItem(`module${page}`, JSON.stringify(moduleTimes))
        //         //@ts-ignore
        //         vid.currentTime = 0
        //     }
        // }

        const seed = `../../assets/modules/${page}/index.md`
        const src = `../../assets/modules/${page}/${vid}.mp4`
        getData(seed, 'md')
            .then((data) => {
                setPost(data)
                setSource(src)
                if (src !== source) {
                    setLoading(true)
                } else {
                    setLoading(false)
                }
            })
            .catch((e) => {
                console.error(e)
                setLoading(false)
            })
    }, [props, page, source, preview, vid])

    //call save timestamp function every 5 seconds
    // const interval = setInterval(() => saveTime(), 5000);

    //save timestamp to local storage
    const saveTime = () => {
        if (!loading) {
            let vid: HTMLElement | null
            let time: object
            try {
                vid = document.getElementById('vid')
                //@ts-ignore
                time = { time: parseInt(vid?.currentTime) }
                localStorage.setItem(`module${page}`, JSON.stringify(time))
            } catch (e) {
                console.log(e)
            }
        }
    }

    return loading && id !== page ? (
        <>loading....</>
    ) : (
        <Layout>
            <h1 className="text-2xl mx-auto">
                Welcome to {props.title} - Module {page} / Video {vid}
            </h1>
            <Button
                className="absolute top-4 right-1 px-4 py-2 rounded-lg"
                size="sm"
                variant="secondary"
                onClick={() => setSideBySide(!sideBySide)}
            >
                Switch views
            </Button>
            <div
                className={`flex mt-3 ${
                    sideBySide
                        ? 'flex-row justify-between items-start'
                        : 'flex-col items-center'
                }`}
            >
                <div
                    className={`aspect-w-16 aspect-h-9 ${
                        sideBySide ? 'w-full mr-2' : 'w-full'
                    }`}
                >
                    <ReactPlayer
                        width={`${sideBySide ? 'auto' : '100%'}`}
                        height={`${sideBySide ? 'auto' : '100%'}`}
                        url={source}
                        controls={true}
                    />
                </div>
                <div
                    className={`w-full ${
                        sideBySide ? 'flex flex-col' : 'block'
                    }`}
                >
                    <section
                        className="flex flex-row w-full my-4"
                        style={{ boxShadow: 'inset 0 -2px rgba(0,0,0,0.1)' }}
                    >
                        <Button
                            size="small"
                            name="Search"
                            variant={active === 'Search' ? 'active' : 'default'}
                            onClick={(e: object) => setActive(e.target.name)}
                            className="pr-4 pl-0"
                        >
                            Search transcript
                        </Button>
                        <Button
                            size="small"
                            name="Overview"
                            variant={
                                active === 'Overview' ? 'active' : 'default'
                            }
                            onClick={(e: object) => setActive(e.target.name)}
                            className="px-4"
                        >
                            Overview
                        </Button>
                        <Button
                            size="small"
                            name="Notes"
                            variant={active === 'Notes' ? 'active' : 'default'}
                            onClick={(e: object) => setActive(e.target.name)}
                            className="px-4"
                        >
                            Notes
                        </Button>
                        <Button
                            size="small"
                            name="Resources"
                            variant={
                                active === 'Resources' ? 'active' : 'default'
                            }
                            onClick={(e: object) => setActive(e.target.name)}
                            className="px-4"
                        >
                            Resources
                        </Button>
                        <Button
                            size="small"
                            name="Exercises"
                            variant={
                                active === 'Exercises' ? 'active' : 'default'
                            }
                            onClick={(e: object) => setActive(e.target.name)}
                            className="px-4"
                        >
                            Exercises
                        </Button>
                    </section>
                    {/*Search section*/}
                    <section
                        className={`w-full ${
                            active === 'Search' ? 'visible' : 'hidden'
                        }`}
                    >
                        <input
                            className={`shadow-inner w-full border-2 border-gray-100 focus:ring-2 focus:ring-blue-400 outline-none py-2 px-4 my-3 transition-all`}
                            type="text"
                            placeholder={`Search through lesson's transcript`}
                        />
                    </section>

                    {/*Overview section*/}
                    <section
                        className={`${
                            active === 'Overview' ? 'visible' : 'hidden'
                        }`}
                    >
                        <ModuleContent content={post} />
                    </section>

                    {/*Notes section*/}
                    <section
                        className={`my-5 bg-gray-100 shadow-md py-2 px-2 border border-gray-200 ${
                            sideBySide ? 'w-full ml-2' : 'w-full'
                        } ${active === 'Notes' ? 'visible' : 'hidden'}`}
                    >
                        <div className="flex flex-row">
                            <Button
                                size="small"
                                onClick={() => setPreview('edit')}
                                variant={
                                    preview === 'edit'
                                        ? 'tabActive'
                                        : 'tabInactive'
                                }
                                className="px-4"
                            >
                                Edit
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setPreview('live')}
                                variant={
                                    preview === 'live'
                                        ? 'tabActive'
                                        : 'tabInactive'
                                }
                                className="px-4"
                            >
                                Live edit
                            </Button>
                            <Button
                                size="small"
                                onClick={() => setPreview('preview')}
                                variant={
                                    preview === 'preview'
                                        ? 'tabActive'
                                        : 'tabInactive'
                                }
                                className="px-4"
                            >
                                Preview
                            </Button>
                        </div>

                        <section className="mb-2 border-0">
                            <MDEditor
                                value={notes}
                                onChange={setNotes}
                                hideToolbar={true}
                                preview={preview}
                            />
                        </section>
                        <div className="flex justify-end">
                            <Button
                                size="small"
                                variant="secondary"
                                className="w-1/5 ml-auto block rounded-lg mb-2"
                            >
                                Load notes
                            </Button>
                            <Button
                                size="small"
                                onClick={() => {
                                    let data = new Blob([notes], {
                                        type: 'text/plain;charset=utf-8',
                                    })
                                    FileSaver.saveAs(data, 'notes.md')
                                }}
                                variant="success"
                                className="w-1/5 ml-2 block rounded-lg mb-2"
                            >
                                Save notes
                            </Button>
                        </div>
                        <i className="text-xs text-gray-500 text-right block w-full">
                            Please note that in order to save your notes you
                            need to have write privileges on your computer.
                        </i>
                    </section>

                    {/*Resources section*/}
                    <section
                        className={`${
                            active === 'Resources' ? 'visible' : 'hidden'
                        }`}
                    >
                        <Resources data={dir} module={page} />
                    </section>

                    {/*Exercises section*/}
                    <section
                        className={`${
                            active === 'Exercises' ? 'visible' : 'hidden'
                        }`}
                    >
                        <Exercises data={dir} module={page} />
                    </section>
                </div>
            </div>
        </Layout>
    )
}

export default Module
