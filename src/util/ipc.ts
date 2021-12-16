export async function getDirectoryStructure(
    toChannel: string,
    fromChannel: string
): Promise<any> {
    window.api.send(toChannel, '_')
    try {
        let data
        window.api.receive(fromChannel, (structure: any) => {
            data = structure
        })
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}
