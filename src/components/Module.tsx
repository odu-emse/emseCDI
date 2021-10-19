import React, { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { getData } from '../helper/fetch'
import Layout from './Layout'
import ReactPlayer from 'react-player'

const Module: React.FC = (props) => {
    const [page, setPage] = useState('1')
    const [post, setPost] = useState('# Hello')
    const [source, setSource] = useState('../../assets/modules/1/video.mp4')
    const [loading, setLoading] = useState(true)

    const {
        //@ts-ignore
        match: { params },
        //@ts-ignore
        title
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
            if(src !== source){
              setLoading(true)
            }
            else{
            setLoading(false)
            }
        })
          .catch(e => {
          console.error(e)
          setLoading(false)
        })

    }, [props, page, source])

    //call save timestamp function every 5 seconds
    // const interval = setInterval(() => saveTime(), 5000);

    //save timestamp to local storage
    const saveTime = () => {
        if(!loading){
            let vid:HTMLElement | null
            let time:object
            try {
                vid = document.getElementById('vid')
                //@ts-ignore
                time = {"time": parseInt(vid?.currentTime)}
                localStorage.setItem(`module${page}`, JSON.stringify(time))
            }catch (e) {
                console.log(e)
            }
        }
    }

    return loading && params.id !== page ? (<>loading....</>) : (
        <Layout>
            <h1 className="text-2xl mx-auto">
                Welcome to ENMA {title} - Module {page}
            </h1>
          <div className="aspect-w-16 aspect-h-9">
            <ReactPlayer
              width="100%"
              height="100%"
              url={source}
              controls={true}
            />
          </div>
            <article>
                <Markdown
                    options={{
                        overrides: {
                            h1: {
                                props: {
                                    className:
                                        'text-2xl font-bold text-gray-800',
                                },
                            },
                            h2: {
                                props: {
                                    className: 'text-xl pb-2 text-gray-700',
                                },
                            },
                            h3: {
                                props: {
                                    className: 'text-lg pb-1 text-gray-500',
                                },
                            },
                        },
                    }}
                >
                    {post}
                </Markdown>
            </article>
        </Layout>
    )
}

export default Module
