import fg from 'fast-glob'
import { parse } from 'path'

interface IStructureFilter {
    dir?: boolean
    files?: boolean
    depth?: number
}

export const getStructure = (
    source: string,
    filter: IStructureFilter,
    flag?: string
) => {
    let structure: any = []

    const stream = fg.sync([source], {
        dot: false,
        onlyFiles: filter.files,
        markDirectories: false,
        onlyDirectories: filter.dir,
        deep: filter.depth,
        absolute: false,
    })

    stream.map((file) => {
        let asset
        if (flag === 'rsc' || flag === 'exe') {
            asset = parse(file)
            structure.push(asset.base)
        } else {
            asset = parse(file)
            structure.push(asset.name)
        }
    })
    return structure
}
