console.log(process.env.NODE_ENV)

// /Volumes/WD_1TB/Projects/emseCDI/dist/mac/emseCDI.app/Contents/Resources/app

export const config: IConfig = {
    path: {
        course: '../../assets/modules',
        module: '../../assets/modules',
        lesson: '../assets/modules',
    },
}

interface IConfig {
    path: {
        course: string
        module: string
        lesson: string
        home?: string
    }
}
