import React from 'react'
import Layout from './Layout'

const Home = () => {
    return (
        <Layout>
            <button
                className="bg-yellow-600 ring-2"
                onClick={() => console.log('here')}
            >
                Get directories
            </button>
        </Layout>
    )
}

export default Home
