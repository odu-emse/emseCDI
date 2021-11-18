"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
// Packages
const electron_1 = require("electron");
const os_1 = __importDefault(require("os"));
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const fs_1 = __importDefault(require("fs"));
const app_1 = require("./app");
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
            preload: (0, path_1.join)(__dirname, 'preload.js'),
            webSecurity: false,
        },
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady()
    .then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
    const port = process.env.PORT || 3000;
    const url = electron_is_dev_1.default
        ? `http://localhost:${port}`
        : (0, path_1.join)(__dirname, '../index.html');
    // and load the index.html of the app.
    if (electron_is_dev_1.default) {
        window?.loadURL(url);
        // Open the DevTools.
        // window.webContents.openDevTools()
    }
    else {
        window?.loadFile(url);
    }
    //@ts-ignore
    electron_1.ipcMain.on('toMain', (event, args) => {
        // Do something with file contents
        // Send result back to renderer process
        let course = [];
        if (electron_is_dev_1.default) {
            try {
                const reactDevToolsPath = (0, path_1.join)(os_1.default.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.20.0_0');
                electron_1.session.defaultSession.loadExtension(reactDevToolsPath);
            }
            catch (error) {
                console.error(error);
            }
        }
        const base_path = electron_is_dev_1.default
            ? (0, path_1.join)(process.cwd(), 'assets', 'modules')
            : (0, path_1.join)(__dirname, '../', 'assets', 'modules');
        fs_1.default.readdirSync(base_path, {
            withFileTypes: true,
        })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => {
            let rsc = (0, app_1.getStructure)((0, path_1.join)(base_path, dirent.name, '/Resources/**.*'), { dir: false, files: true, depth: 1 }, 'rsc');
            let exe = (0, app_1.getStructure)((0, path_1.join)(base_path, dirent.name, '/Exercises/**.*'), { dir: false, files: true, depth: 1 }, 'exe');
            let vids = (0, app_1.getStructure)((0, path_1.join)(base_path, dirent.name, '/*.{mp4, MP4, avi, flv}'), { dir: false, files: true, depth: 1 });
            let mod = {
                name: dirent.name,
                videos: [],
                resources: [],
                exercises: [],
            };
            if (vids.length > 0) {
                vids.map((vid) => {
                    mod.videos.push(vid);
                });
            }
            if (rsc.length > 0) {
                rsc.map((resource) => {
                    mod.resources.push(resource);
                });
            }
            if (exe.length > 0) {
                exe.map((exercise) => {
                    mod.exercises.push(exercise);
                });
            }
            course.push(mod);
        });
        event.sender.send('fromMain', course.sort((x, y) => {
            //@ts-ignore
            return x.name - y.name;
        }));
    });
})
    .catch((error) => {
    console.error(error);
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
