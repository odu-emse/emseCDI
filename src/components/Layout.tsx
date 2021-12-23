import React from 'react'

const Layout: React.FC = ({ children }) => {
    return (
        <section className="py-6 px-3 flex flex-col lg:w-4/5 w-3/4">
            
            {children}
            
            <img className="object-scale-down h-12 mr-0" src="../assets/BCET_long_logo_UI.png"></img>
            
            
        </section>
    )
}

export default Layout
