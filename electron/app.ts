import fg from 'fast-glob'
import { parse } from 'path'

interface IStructureFilter {
    dir?: boolean
    files?: boolean
    depth?: number
}

interface IReturnStructure {
    name: string
    path: string
    parent: string
    ext: string
    other: string
}

export const getStructure = (
    source: string,
    filter: IStructureFilter
    // flag?: string
): [IReturnStructure] => {
    let structure: any = []

    const stream = fg.sync([source], {
        dot: false,
        onlyFiles: filter.files,
        markDirectories: false,
        onlyDirectories: filter.dir,
        deep: filter.depth,
        absolute: false,
    })
    let staticAssets = [
        '.xlsx',
        '.xls',
        '.docx',
        '.doc',
        '.pptx',
        '.ppt',
        '.pdf',
        '.md',
        '.mp4',
        '.MP4',
    ]

    stream.map((file) => {
        let asset = parse(file)

        if (staticAssets.includes(asset.ext)) {
            structure.push({
                name: asset.base,
                path: `${asset.dir}/${asset.base}`,
                parent: asset.dir,
                ext: asset.ext,
                other: asset.root,
            })
        }
    })
    return structure
}
