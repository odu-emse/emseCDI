import { ipcRenderer, contextBridge } from 'electron'

declare global {
    interface Window {
        api: typeof api
        ipcRenderer: typeof ipcRenderer
    }
}

export const api = {
    send: (channel: any, data: any) => {
        // whitelist channels
        let validChannels = ['toMain', 'getPath']
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    receive: (channel: any, func: any) => {
        let validChannels = ['fromMain', 'sendPath']
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            // @ts-ignore
            ipcRenderer.on(channel, (event, ...args) => func(...args))
            // @ts-ignore
            ipcRenderer.removeListener('fromMain', (event, ...args) =>
                func(...args)
            )
            // @ts-ignore
            ipcRenderer.removeListener('sendPath', (event, ...args) =>
                func(...args)
            )
        }
    },
}

contextBridge.exposeInMainWorld('api', api)

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)
