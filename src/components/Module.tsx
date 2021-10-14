import React, { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { getData } from '../helper/fetch'
import Layout from './Layout'

const Module: React.FC = (props) => {
    const [page, setPage] = useState('1')
    const [post, setPost] = useState('# Hello')
    const [source, setSource] = useState('../../assets/modules/1/video.mp4')

    const {
        //@ts-ignore
        match: { params },
    } = props

    useEffect(() => {
        setPage(params.id)

        const seed = `../../assets/modules/${page}/index.md`
        const src = `../../assets/modules/${page}/video.mp4`
        getData(seed, 'md').then((data) => {
            setPost(data)
            setSource(src)
        })
    }, [props, post, page])

    return (
        <Layout>
            <h1 className="text-2xl mx-auto">
                Welcome to ENMA 600 - Module {page}
            </h1>
            <video
                controls={true}
                className="mx-auto shadow-md"
                autoPlay={false}
            >
                <source
                    src={source}
                    type="video/mp4"
                />
            </video>
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
