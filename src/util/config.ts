console.log(process.env.NODE_ENV)

export const config = {
    path:
        process.env.NODE_ENV === 'development'
            ? '../assets/modules'
            : '../assets/modules', //base path for modules
}
