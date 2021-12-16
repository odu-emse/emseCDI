import React from 'react'
import { Helmet } from 'react-helmet'

const Title = (loc: Location) => {
    return (
        <div>
            <Helmet>
                <title>{loc.pathname}</title>
            </Helmet>
        </div>
    )
}

export default Title
