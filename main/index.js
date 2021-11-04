"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = __importStar(require("path"));
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const os_1 = __importDefault(require("os"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const fs_1 = __importDefault(require("fs"));
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
const getStructure = (source, filter, flag) => {
    let structure = [];
    const stream = fast_glob_1.default.sync([source], {
        dot: false,
        onlyFiles: filter.files,
        markDirectories: false,
        onlyDirectories: filter.dir,
        deep: filter.depth,
        absolute: false,
    });
    stream.map((file) => {
        let asset;
        if (flag === 'rsc' || flag === 'exe') {
            asset = path_1.default.parse(file);
            structure.push(asset.base);
        }
        else {
            asset = path_1.default.parse(file);
            structure.push(asset.name);
        }
    });
    return structure;
};
//@ts-ignore
electron_1.ipcMain.on('toMain', (event, args) => {
    // Do something with file contents
    // Send result back to renderer process
    let course = [];
    fs_1.default.readdirSync(`${process.cwd()}/assets/modules/`, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => {
        let rsc = getStructure(`${process.cwd()}/assets/modules/${dirent.name}/Resources/**.*`, { dir: false, files: true, depth: 1 }, 'rsc');
        let exe = getStructure(`${process.cwd()}/assets/modules/${dirent.name}/Exercises/**.*`, { dir: false, files: true, depth: 1 }, 'exe');
        let vids = getStructure(`${process.cwd()}/assets/modules/${dirent.name}/*.mp4`, { dir: false, files: true, depth: 1 });
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
    window.webContents.send('fromMain', course.sort((x, y) => {
        //@ts-ignore
        return x.name - y.name;
    }));
});
