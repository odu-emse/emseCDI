import React, { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { getData } from '../helper/fetch'
import Layout from './Layout'
import ReactPlayer from 'react-player'
import ModuleContent from './ModuleContent'
import FileSaver from 'file-saver'
import Button from './Button'

const Module: React.FC = (props) => {
    const [page, setPage] = useState('1')
    const [post, setPost] = useState('# Hello')
    const [source, setSource] = useState('../../assets/modules/1/video.mp4')
    const [loading, setLoading] = useState(true)
    const [preview, setPreview] = useState('edit')
    const [notes, setNotes] = useState('')

    const {
        //@ts-ignore
        match: { params },
        //@ts-ignore
        title,
    } = props

    useEffect(() => {
        setPage(params.id)

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
        const src = `../../assets/modules/${page}/video.mp4`
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
    }, [props, page, source, preview])

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
                Welcome to {title} - Module {page}
            </h1>
            <div className="aspect-w-16 aspect-h-9">
                <ReactPlayer
                    width="100%"
                    height="100%"
                    url={source}
                    controls={true}
                />
            </div>
            <section className="my-5">
                <h2 className="text-2xl mx-auto font-bold">Your notes</h2>

                <div className="flex flex-row justify-between">
                    <Button
                        size="small"
                        onClick={() => setPreview('edit')}
                        variant={preview === 'edit' ? "primary" : 'secondary'}
                        className="w-1/4"
                    >Edit</Button>
                    <Button
                        size="small"
                        onClick={() => setPreview('live')}
                        variant={preview === 'live' ? "primary" : 'secondary'}
                        className="w-1/4"
                    >Live edit</Button>
                    <Button
                        size="small"
                        onClick={() => setPreview('preview')}
                        variant={preview === 'preview' ? "primary" : 'secondary'}
                        className="w-1/4"
                    >Preview</Button>
                </div>

                <section className="shadow-sm my-1 border-2 border-gray-100">
                    <MDEditor
                        value={notes}
                        onChange={setNotes}
                        hideToolbar={true}
                        preview={preview}
                    />
                </section>
                <Button
                    size="small"
                    onClick={() => {
                        let data = new Blob([notes], {
                            type: 'text/plain;charset=utf-8',
                        })
                        FileSaver.saveAs(data, 'notes.md')
                    }}
                    variant="primary"
                    className="w-1/2 mx-auto block"
                >Save notes</Button>
                <i className="text-sm text-gray-500 text-center block w-full">
                    Please note that in order to save your notes you need to
                    have write privileges on your computer.
                </i>
            </section>
            <ModuleContent content={post} />
        </Layout>
    )
}

export default Module
