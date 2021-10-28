// Native
import path, { join } from 'path'

// Packages
import { BrowserWindow, app, ipcMain, session } from 'electron'
import isDev from 'electron-is-dev'
import os from 'os'
import fg from 'fast-glob'
import fs from 'fs'

//custom packages

const height = 600
const width = 800

let window: any

function createWindow() {
    // Create the browser window.
    window = new BrowserWindow({
        width,
        height,
        frame: true,
        show: true,
        resizable: true,
        fullscreenable: true,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            preload: join(__dirname, 'preload.js'), // use a preload script
        },
    })

    const port = process.env.PORT || 3000
    const url = isDev
        ? `http://localhost:${port}`
        : join(__dirname, '../src/out/index.html')

    // and load the index.html of the app.
    if (isDev) {
        window?.loadURL(url)
        // Open the DevTools.
        window.webContents.openDevTools()
    } else {
        window?.loadFile(url)
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

const reactDevToolsPath = join(
    os.homedir(),
    '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.20.0_0'
)

app.whenReady().then(async () => {
    await session.defaultSession.loadExtension(reactDevToolsPath)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

const getStructure = (
    source: string,
    filter = { dir: true, files: false, depth: 1 }
) => {
    let structure: any = []

    const stream = fg.sync([source], {
        dot: false,
        onlyFiles: filter.files,
        markDirectories: false,
        onlyDirectories: filter.dir,
        deep: filter.depth,
        absolute: false,
    })

    stream.map((file) => {
        // const dir = dirs.replace(/[^0-9]/g, '')
        const vid = path.parse(file)
        structure.push(vid.name)
    })
    return structure
}

//@ts-ignore
ipcMain.on('toMain', (event, args) => {
    // Do something with file contents
    // Send result back to renderer process

    let course: any = []

    fs.readdirSync(`${process.cwd()}/assets/modules/`, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => {
            let vids = getStructure(
                `${process.cwd()}/assets/modules/${dirent.name}/*.mp4`,
                { dir: false, files: true, depth: 1 }
            )
            let mod: any = {
                name: dirent.name,
                videos: [],
            }
            vids.map((vid: string) => {
                mod.videos.push(vid)
            })
            course.push(mod)
        })

    window.webContents.send('fromMain', course)
})
