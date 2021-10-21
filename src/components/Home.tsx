import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import Markdown from 'markdown-to-jsx'
import { getData } from '../helper/fetch'

const Home = () => {
    const [courseContent, setCourseContent] = useState('# Welcome to ENMA 600')

    useEffect(() => {
        let mounted = true
        getData('../assets/modules/index.md', 'md').then((res) => {
            if (mounted) {
                setCourseContent(res)
            }
        }).catch(e => console.error(e))
        return function cleanup(){
            mounted = false
        }
    }, [])
    return (
        <Layout>
            <Markdown
                options={{
                    overrides: {
                        h1: {
                            props: {
                                className: 'text-2xl font-bold text-gray-800',
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
                {courseContent}
            </Markdown>
        </Layout>
    )
}

export default Home
