// Native
import { join } from 'path'

// Packages
import { BrowserWindow, app, ipcMain, session } from 'electron'
import isDev from 'electron-is-dev'
import os from 'os'
import fg from 'fast-glob'

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

//@ts-ignore
ipcMain.on('toMain', (event, args) => {
    // Do something with file contents
    // Send result back to renderer process

    let structure: any = []

    const stream = fg.sync([`${process.cwd()}/assets/modules/**/*`], {
        dot: false,
        onlyFiles: false,
        markDirectories: false,
        onlyDirectories: true,
        deep: 1,
        absolute: false,
    })

    stream.map((dirs) => {
        const dir = dirs.replace(/[^0-9]/g, '')
        structure.push(dir)
    })

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

    let str = [...new Set(structure)]

    window.webContents.send('fromMain', str)
})
