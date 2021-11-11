import React from 'react'

interface IExercises {
    data: [object] | []
    module: string
}

const Exercises: React.FC<IExercises> = ({ data, module }) => {
    const exe: [string] = data[parseInt(module) - 1]?.exercises

    return data !== null && data.length <= 0 ? (
        <>No exercises found.</>
    ) : (
        <>
            {exe.length > 0 ? (
                exe.map((exercise: string, index: number) => (
                    <a
                        className={`underline text-blue-400 block`}
                        href=""
                        key={index}
                    >
                        {exercise}
                    </a>
                ))
            ) : (
                <>No exercises found.</>
            )}
        </>
    )
}

export default Exercises
