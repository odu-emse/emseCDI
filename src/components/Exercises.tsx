import React, { useEffect, useState } from 'react'
import { IModule } from '../util/types'

interface IExercises {
    data: [IModule] | []
    module: number
}

const Exercises: React.FC<IExercises> = ({ data, module }) => {
    const [exe, setExe] = useState(data)

    useEffect(() => {
        setExe(data)
    }, [data])

    return data !== null && data.length <= 0 ? (
        <>No exercises found.</>
    ) : (
        <>
            {exe.length > 0 ? (
                exe.map((exercise: IModule, index: number) => (
                    <a
                        className={`underline text-blue-400 block`}
                        href=""
                        key={index}
                    >
                        {exercise.name}
                    </a>
                ))
            ) : (
                <>No exercises found.</>
            )}
        </>
    )
}

export default Exercises
