import React from 'react'

const Layout: React.FC = ({ children }) => {
    return (
        <section className="py-3 px-3 flex flex-col lg:w-4/5 w-3/4">
            {children}
        </section>
    )
}

export default Layout
