export const getData = async (url: string, type: string) => {
    try {
        const res = await fetch(url)
        if (type === 'md') {
            return res.text()
        } else if (type === 'json') {
            return res.json()
        }
    } catch (error) {
        console.error(error)
        return ''
    }
}
