"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const os_1 = __importDefault(require("os"));
const fast_glob_1 = __importDefault(require("fast-glob"));
//custom packages
const height = 600;
const width = 800;
let window;
function createWindow() {
    // Create the browser window.
    window = new electron_1.BrowserWindow({
        width,
        height,
        frame: true,
        show: true,
        resizable: true,
        fullscreenable: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: (0, path_1.join)(__dirname, 'preload.js'), // use a preload script
        },
    });
    const port = process.env.PORT || 3000;
    const url = electron_is_dev_1.default
        ? `http://localhost:${port}`
        : (0, path_1.join)(__dirname, '../src/out/index.html');
    // and load the index.html of the app.
    if (electron_is_dev_1.default) {
        window?.loadURL(url);
        // Open the DevTools.
        window.webContents.openDevTools();
    }
    else {
        window?.loadFile(url);
    }
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
const reactDevToolsPath = (0, path_1.join)(os_1.default.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.20.0_0');
electron_1.app.whenReady().then(async () => {
    await electron_1.session.defaultSession.loadExtension(reactDevToolsPath);
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
//@ts-ignore
electron_1.ipcMain.on('toMain', (event, args) => {
    // Do something with file contents
    // Send result back to renderer process
    let structure = [];
    const stream = fast_glob_1.default.sync([`${process.cwd()}/assets/modules/**/*`], {
        dot: false,
        onlyFiles: false,
        markDirectories: false,
        onlyDirectories: true,
        deep: 1,
        absolute: false,
    });
    stream.map((dirs) => {
        const dir = dirs.replace(/[^0-9]/g, '');
        structure.push(dir);
    });
    // The below lines are commented out since we aren't focused on nested directories for now
    // const oneLevelDeeper = fg.sync([`${process.cwd()}/assets/modules/**/*`], {
    //     dot: false,
    //     onlyFiles: false,
    //     markDirectories: false,
    //     onlyDirectories: true,
    //     deep: 3,
    //     absolute: false,
    // })
    // oneLevelDeeper.map((dirs) => {
    //     const dir = dirs.match(/([0-9]+\.?[0-9]*|[0-9]*\.?[0-9]+)$/)
    //     //@ts-ignore
    //     console.log(dir[0])
    //     //@ts-ignore
    //     structure.push(dir[0])
    // })
    let str = [...new Set(structure)];
    window.webContents.send('fromMain', str);
});
