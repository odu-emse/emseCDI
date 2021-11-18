// Native
import { join } from 'path'

// Packages
import { BrowserWindow, app, ipcMain, session } from 'electron'
import os from 'os'
import isDev from 'electron-is-dev'
import fs from 'fs'
import { getStructure } from './app'

//custom packages

const height = 600
const width = 800

let window: BrowserWindow

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
            webSecurity: false,
        },
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
    .then(() => {
        createWindow()

        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
        const port = process.env.PORT || 3000
        const url = isDev
            ? `http://localhost:${port}`
            : join(__dirname, '../index.html')

        // and load the index.html of the app.
        if (isDev) {
            window?.loadURL(url)
            // Open the DevTools.
            // window.webContents.openDevTools()
        } else {
            window?.loadFile(url)
        }

        //@ts-ignore
        ipcMain.on('toMain', (event: IpcMainEvent, args: any) => {
            // Do something with file contents
            // Send result back to renderer process

            let course: any = []

            if (isDev) {
                try {
                    const reactDevToolsPath = join(
                        os.homedir(),
                        '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.20.0_0'
                    )
                    session.defaultSession.loadExtension(reactDevToolsPath)
                } catch (error) {
                    console.error(error)
                }
            }

            const base_path = isDev
                ? join(process.cwd(), 'assets', 'modules')
                : join(__dirname, '../', 'assets', 'modules')

            fs.readdirSync(base_path, {
                withFileTypes: true,
            })
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => {
                    let rsc = getStructure(
                        join(base_path, dirent.name, '/Resources/**.*'),
                        { dir: false, files: true, depth: 1 },
                        'rsc'
                    )
                    let exe = getStructure(
                        join(base_path, dirent.name, '/Exercises/**.*'),
                        { dir: false, files: true, depth: 1 },
                        'exe'
                    )
                    let vids = getStructure(
                        join(base_path, dirent.name, '/*.{mp4, MP4, avi, flv}'),
                        { dir: false, files: true, depth: 1 }
                    )
                    let mod: any = {
                        name: dirent.name,
                        videos: [],
                        resources: [],
                        exercises: [],
                    }
                    if (vids.length > 0) {
                        vids.map((vid: string) => {
                            mod.videos.push(vid)
                        })
                    }
                    if (rsc.length > 0) {
                        rsc.map((resource: string) => {
                            mod.resources.push(resource)
                        })
                    }
                    if (exe.length > 0) {
                        exe.map((exercise: string) => {
                            mod.exercises.push(exercise)
                        })
                    }
                    course.push(mod)
                })

            event.sender.send(
                'fromMain',
                course.sort((x: object, y: object) => {
                    //@ts-ignore
                    return x.name - y.name
                })
            )
        })
    })
    .catch((error) => {
        console.error(error)
    })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
