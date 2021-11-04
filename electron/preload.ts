import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
    send: (channel: any, data: any) => {
        // whitelist channels
        let validChannels = ['toMain', 'getModules']
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    receive: (channel: any, func: any) => {
        let validChannels = ['fromMain', 'toModules']
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            // @ts-ignore
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
    },
})
