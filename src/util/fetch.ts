export const getData = async (url: string, type: string) => {
    try {
        const res = await fetch(url)
        if (!res) {
            throw new Error('Error')
        } else {
            if (type === 'md') {
                let data = await res.text()
                return data
            } else if (type === 'json') {
                let data = await res.json()
                return data
            }
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
