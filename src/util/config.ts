console.log(process.env.NODE_ENV)

export const config = {
    path: {
        course:
            process.env.NODE_ENV === 'development'
                ? '../assets/modules'
                : './assets/modules',
        module:
            process.env.NODE_ENV === 'development'
                ? '../assets/modules'
                : './assets/modules',
        lesson:
            process.env.NODE_ENV === 'development'
                ? '../assets/modules'
                : './assets/modules',
    },
}
