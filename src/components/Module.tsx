import React, { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { getData } from '../util/fetch'
import Layout from './Layout'
import ReactPlayer from 'react-player'
import ModuleContent from './ModuleContent'
import FileSaver from 'file-saver'
import Button from './Button'

const Module: React.FC = (props) => {
    const [page, setPage] = useState('1')
    const [vid, setVid] = useState()
    const [post, setPost] = useState('# Hello')
    const [source, setSource] = useState('../../assets/modules/1/video.mp4')
    const [loading, setLoading] = useState(true)
    const [preview, setPreview] = useState('edit')
    const [notes, setNotes] = useState('')
    const [sideBySide, setSideBySide] = useState(false)

    const {
        //@ts-ignore
        match: { params },
        //@ts-ignore
        title,
    } = props

    useEffect(() => {
        setPage(params.id)
        setVid(params.videoID)

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

        console.log(params)

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

    return loading && params.id !== page ? (
        <>loading....</>
    ) : (
        <Layout>
            <h1 className="text-2xl mx-auto">
                Welcome to {title} - Module {page} / Video {vid}
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
                className={`flex ${
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
                <section
                    className={`my-5 bg-gray-100 shadow-md py-2 px-2 border border-gray-200 ${
                        sideBySide ? 'w-full ml-2' : 'w-full'
                    }`}
                >
                    <div className="flex flex-row">
                        <Button
                            size="small"
                            onClick={() => setPreview('edit')}
                            variant={
                                preview === 'edit' ? 'tabActive' : 'tabInactive'
                            }
                            className="px-4"
                        >
                            Edit
                        </Button>
                        <Button
                            size="small"
                            onClick={() => setPreview('live')}
                            variant={
                                preview === 'live' ? 'tabActive' : 'tabInactive'
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
                        Please note that in order to save your notes you need to
                        have write privileges on your computer.
                    </i>
                </section>
            </div>
            <ModuleContent content={post} />
        </Layout>
    )
}

export default Module
