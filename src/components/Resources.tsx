import React from 'react'
import { IModule } from '../util/types'
import { useState, useEffect } from 'react'

interface IResources {
    data: [IModule] | []
    module: number
}

const Resources: React.FC<IResources> = ({ data, module }) => {
    const [rsc, setRsc] = useState(data)

    useEffect(() => {
        setRsc(data)
    }, [data])

    return data !== null && data.length <= 0 ? (
        <>No resources found.</>
    ) : (
        <>
            {rsc.length > 0 ? (
                rsc.map((resource: IModule, index: number) => (
                    <a
                        className={`underline text-blue-400 block`}
                        href=""
                        key={index}
                    >
                        {resource.name}
                    </a>
                ))
            ) : (
                <>No resources found.</>
            )}
        </>
    )
}

export default Resources
