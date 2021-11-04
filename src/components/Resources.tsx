import React from 'react'

interface IResources {
    data: [object] | []
    module: string
}

const Resources: React.FC<IResources> = ({ data, module }) => {
    const rsc: [string] = data[parseInt(module) - 1]?.resources

    return data !== null && data.length <= 0 ? (
        <>No resources found.</>
    ) : (
        <>
            {rsc.length > 0 ? (
                rsc.map((resource: string, index: number) => (
                    <a
                        className={`underline text-blue-400 block`}
                        href=""
                        key={index}
                    >
                        {resource}
                    </a>
                ))
            ) : (
                <>No resources found.</>
            )}
        </>
    )
}

export default Resources
