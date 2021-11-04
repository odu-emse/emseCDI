import FileSaver from 'file-saver'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getData } from '../util/fetch'
import Button from './Button'
import ModuleContent from './ModuleContent'

const Lesson: React.FC = (props) => {
    const [data, setData] = useState([])
    const [overview, setOverview] = useState('# Hello')
    const [active, setActive] = useState('Overview')

    const moduleNumber = props.match.params.id

    useEffect(() => {
        let mount = true
        if (mount) {
            // @ts-ignore
            window.api.send('toMain', '_')
            // @ts-ignore
            window.api.receive('fromMain', (res: any) => {
                setData(res)
            })

            const seed = `../../assets/modules/${moduleNumber}/index.md`
            getData(seed, 'md')
                .then((data) => {
                    setOverview(data)
                })
                .catch((e) => {
                    console.error(e)
                })
        }
        return function cleanup() {
            mount = false
        }
    }, [moduleNumber])

    return (
        <section className={`flex flex-col w-full`}>
            <h1 className={`text-2xl block`}>This is Module {moduleNumber}</h1>
            <section
                className="flex flex-row w-full my-4"
                style={{ boxShadow: 'inset 0 -2px rgba(0,0,0,0.1)' }}
            >
                <Button
                    size="small"
                    name="Overview"
                    variant={active === 'Overview' ? 'active' : 'default'}
                    onClick={(e: object) => setActive(e.target.name)}
                    className="px-4"
                >
                    Overview
                </Button>
                <Button
                    size="small"
                    name="Resources"
                    variant={active === 'Resources' ? 'active' : 'default'}
                    onClick={(e: object) => setActive(e.target.name)}
                    className="px-4"
                >
                    Resources
                </Button>
                <Button
                    size="small"
                    name="Exercises"
                    variant={active === 'Exercises' ? 'active' : 'default'}
                    onClick={(e: object) => setActive(e.target.name)}
                    className="px-4"
                >
                    Exercises
                </Button>
                <Button
                    size="small"
                    name="Videos"
                    variant={active === 'Videos' ? 'active' : 'default'}
                    onClick={(e: object) => setActive(e.target.name)}
                    className="px-4"
                >
                    Videos
                </Button>
            </section>
            {/*Overview section*/}
            <section
                className={`px-4 ${
                    active === 'Overview' ? 'visible' : 'hidden'
                }`}
            >
                <ModuleContent content={overview} />
            </section>
            {/*Resources section*/}
            <section
                className={`px-4 ${
                    active === 'Resources' ? 'visible' : 'hidden'
                }`}
            >
                <Resources data={data} moduleNumber={moduleNumber} />
            </section>
            {/*Exercises section*/}
            <section
                className={`px-4 ${
                    active === 'Exercises' ? 'visible' : 'hidden'
                }`}
            >
                <Exercises data={data} moduleNumber={moduleNumber} />
            </section>
            {/*Videos section*/}
            <section
                className={`px-4 ${active === 'Videos' ? 'visible' : 'hidden'}`}
            >
                <Videos data={data} moduleNumber={moduleNumber} />
            </section>
        </section>
    )
}

export default Lesson

interface IModuleData {
    data: [
        {
            resources: [string]
            exercises: [string]
            videos: [string]
            name: string
        }
    ]
    moduleNumber: number
}

const Resources: React.FC<IModuleData> = ({ data, moduleNumber }) => {
    return (
        <section>
            {data[moduleNumber - 1]?.resources.length !== 0 ? (
                data[moduleNumber - 1]?.resources.map(
                    (resource: string, index: number) => (
                        <button
                            className={`block underline text-blue-400`}
                            key={index}
                            onClick={() => {
                                let data = new Blob([resource], {
                                    type: 'text/plain;charset=utf-8',
                                })
                                FileSaver.saveAs(
                                    `../../assets/modules/${moduleNumber}/Resources/${resource}`,
                                    resource
                                )
                            }}
                        >
                            {resource}
                        </button>
                    )
                )
            ) : (
                <>No resources found for this module.</>
            )}
        </section>
    )
}

const Exercises: React.FC<IModuleData> = ({ data, moduleNumber }) => {
    return (
        <section className={``}>
            {data[moduleNumber - 1]?.exercises.length !== 0 ? (
                data[moduleNumber - 1]?.exercises.map(
                    (exercise: string, index: number) => (
                        <button
                            className={`block underline text-blue-400`}
                            key={index}
                            onClick={() => {
                                let data = new Blob([exercise], {
                                    type: 'text/plain;charset=utf-8',
                                })
                                FileSaver.saveAs(
                                    `../../assets/modules/${moduleNumber}/Exercises/${exercise}`,
                                    exercise
                                )
                            }}
                        >
                            {exercise}
                        </button>
                    )
                )
            ) : (
                <>No exercises found for this module.</>
            )}
        </section>
    )
}

const Videos: React.FC<IModuleData> = ({ data, moduleNumber }) => {
    return (
        <section className={``}>
            {data[moduleNumber - 1]?.videos.length !== 0 ? (
                data[moduleNumber - 1]?.videos.map(
                    (module: string, index: number) => (
                        <Link
                            className={`block underline text-blue-400`}
                            to={`/modules/${moduleNumber}/${module}`}
                            key={index}
                        >
                            Lecture {module}
                        </Link>
                    )
                )
            ) : (
                <>No lecture videos found for this module.</>
            )}
        </section>
    )
}
