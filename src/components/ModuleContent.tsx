import React from 'react'
import Markdown from 'markdown-to-jsx'

const ModuleContent = ({ content }) => {
    return (
        <article>
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
                {content}
            </Markdown>
        </article>
    )
}

export default ModuleContent
