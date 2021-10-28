'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const electron_1 = require('electron')
electron_1.contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ['toMain', 'getModules']
        if (validChannels.includes(channel)) {
            electron_1.ipcRenderer.send(channel, data)
        }
    },
    receive: (channel, func) => {
        let validChannels = ['fromMain', 'toModules']
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            // @ts-ignore
            electron_1.ipcRenderer.on(channel, (event, ...args) =>
                func(...args)
            )
        }
    },
})
