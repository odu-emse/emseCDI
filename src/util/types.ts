export interface IModule {
    ext: string
    name: string
    other: string
    parent: string
    path: string
}

export interface IModuleData {
    name: string
    videos: [IModule]
    resources: [IModule]
    exercises: [IModule]
    overview: IModule
}

export interface ICourseData {
    course: string
    modules: [IModuleData]
}
