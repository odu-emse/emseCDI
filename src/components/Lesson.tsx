import FileSaver from 'file-saver'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getData } from '../util/fetch'
import Button from './Button'
import ModuleContent from './ModuleContent'
import { isDev } from '../util/isDev'
import { AppContext } from '../App'
import { IModule, IModuleData } from '../util/types'

const Lesson: React.FC = () => {
    const [data, setData] = useState({} as IModuleData)
    const [overview, setOverview] = useState('# Loading...')
    const [active, setActive] = useState('Overview')
    // const [absolutePath, setAbsolutePath] = useState('')
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    const value = useContext(AppContext)

    const { course }: [IModuleData] = value
    const { modules } = course

    const lessonNumber = id - 1

    useEffect(() => {
        setData(modules.at(lessonNumber))
        setLoading(false)
    }, [lessonNumber])

    try {
        getData(
            isDev() ? `/assets/modules/${id}/index.md` : data.overview.path,
            'md'
        )
            .then((res) => {
                setOverview(res)
            })
            .catch((err) => console.error(err))
    } catch (error) {
        console.log(error)
    }

    return loading ? (
        <>Loading...</>
    ) : (
        <section className={`flex flex-col w-full`}>
            <h1 className={`text-2xl block`}>This is Module {id}</h1>
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
                <Resources data={data} />
            </section>
            {/*Exercises section*/}
            <section
                className={`px-4 ${
                    active === 'Exercises' ? 'visible' : 'hidden'
                }`}
            >
                <Exercises data={data} />
            </section>
            {/*Videos section*/}
            <section
                className={`px-4 ${active === 'Videos' ? 'visible' : 'hidden'}`}
            >
                <Videos data={data} />
            </section>
        </section>
    )
}

export default Lesson

interface IModuleTabPropData {
    data: {
        resources: [IModule]
        exercises: [IModule]
        videos: [IModule]
        name: string
    }
}

const Resources: React.FC<IModuleTabPropData> = ({ data }) => {
    const moduleData = data
    return (
        <section>
            {moduleData?.resources.length ? (
                moduleData?.resources.map(
                    (resource: IModule, index: number) => (
                        <button
                            className={`block underline text-blue-400`}
                            key={index}
                            onClick={async () => {
                                let data = new File(
                                    [resource.path],
                                    resource.name,
                                    {
                                        type: 'text/plain;charset=utf-8',
                                    }
                                )
                                FileSaver.saveAs(data)
                            }}
                        >
                            {resource.name}
                        </button>
                    )
                )
            ) : (
                <>No resources found for this module.</>
            )}
        </section>
    )
}

const Exercises: React.FC<IModuleTabPropData> = ({ data }) => {
    const moduleData = data
    return (
        <section className={``}>
            {moduleData?.exercises.length ? (
                moduleData?.exercises.map(
                    (exercise: IModule, index: number) => (
                        <button
                            className={`block underline text-blue-400`}
                            key={index}
                            onClick={() => {
                                let data = new Blob([exercise.path])
                                console.log(data)
                                FileSaver.saveAs(exercise.path, exercise.name)
                            }}
                        >
                            {exercise.name}
                        </button>
                    )
                )
            ) : (
                <>No exercises found for this module.</>
            )}
        </section>
    )
}

const Videos: React.FC<IModuleTabPropData> = ({ data }) => {
    const moduleData = data
    return (
        <section className={``}>
            {moduleData?.videos.length ? (
                moduleData?.videos.map((module: IModule, index: number) => (
                    <Link
                        className={`block underline text-blue-400`}
                        to={`/modules/${moduleData.name}/${module.name}`}
                        key={index}
                    >
                        Lecture {module.name}
                    </Link>
                ))
            ) : (
                <>No lecture videos found for this module.</>
            )}
        </section>
    )
}
