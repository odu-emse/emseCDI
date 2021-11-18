"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const electron_1 = require("electron");
exports.api = {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ['toMain', 'getModules'];
        if (validChannels.includes(channel)) {
            electron_1.ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ['fromMain', 'toModules'];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            // @ts-ignore
            electron_1.ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
};
electron_1.contextBridge.exposeInMainWorld('api', exports.api);
electron_1.contextBridge.exposeInMainWorld('ipcRenderer', electron_1.ipcRenderer);
