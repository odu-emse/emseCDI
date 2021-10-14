export const getData = async (url: string, type: string) => {
    const res = await fetch(url)
    if (type === 'md') {
        return res.text()
    } else if (type === 'json') {
        return res.json()
    }
}
