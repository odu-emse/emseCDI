import React, { useContext, useEffect, useState } from 'react'
import Layout from './Layout'
import Markdown from 'markdown-to-jsx'
import { getData } from '../util/fetch'
import { config } from '../util/config'
import { generatePath } from 'react-router-dom'
import { isDev } from '../util/isDev'
import { AppContext } from '../App'
import { IModuleData } from '../util/types'

const Home = () => {
    const [courseContent, setCourseContent] = useState('# Welcome to ENMA 600')
    const [loading, setLoading] = useState(true)
    const [path, setPath] = useState('')

    const value = useContext(AppContext)

    const { course }: [IModuleData] = value

    useEffect(() => {
        setPath(course.course)
    }, [courseContent])

    try {
        getData(`${isDev() ? '../../assets' : path}/modules/index.md`, 'md')
            .then((res) => {
                if (res) {
                    setCourseContent(res)
                    setLoading(false)
                } else {
                    setLoading(false)
                    return null
                }
            })
            .catch((e) => {
                console.error(e)
                setLoading(false)
                return null
            })
    } catch (error) {
        console.log(error)
    }

    return loading ? (
        <>Loading...</>
    ) : (
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
