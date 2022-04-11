// Modules to control application life and create native browser window
const electron = require("electron");

const { app, BrowserWindow, ipcMain } = electron;

const path = require('path')

// import { communicator } from "./communicator.js";

const { communicator } = require('./communicator')
// let form = document.querySelector("form")

function createWindow () {
  // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()

    })
    communicator(ipcMain)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// receive message from index.html 
// ipcMain.on('asynchronous-message', (event, arg) => {
//     console.log( arg , process.cwd());
    
//     // send message to index.html
//     event.sender.send('asynchronous-reply', 'hello' );
// });
/**************************************************************************************************** */

// const { app, BrowserWindow, ipcMain } = require('electron')

// let mainWindow

// function createWindow () {
//     const mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             preload: path.join(__dirname, 'preload.js'),
//             nodeIntegration: true,
//             contextIsolation: false
//         }
//     })
//     mainWindow.loadFile('index.html')

//     // Open the DevTools.
//     // mainWindow.webContents.openDevTools()

//     mainWindow.on('closed', () => {
//         mainWindow = null
//     })
// }

// app.on('ready', createWindow)

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })

// app.on('activate', () => {
//     if (mainWindow === null) {
//         createWindow()
//     }
// })

// Receive async message from renderer
// See file renderer.js on line 3
ipcMain.on('ping-good', event => {
    // It's so good because below have a delay 5s to execute, and this don't lock rendereder :)
    setTimeout(() => {
        console.log('GOOD finshed!')
        // Send reply to a renderer
        event.sender.send('ping-good-reply', 'pong')
    }, 5000)
})

// Receive sync message from renderer
// See file renderer.js on line 18
ipcMain.on('ping-bad', event => {
    // It's so bad because below have a delay 5s to execute, meanwhile the renderer stay locked :(
    setTimeout(() => {
        console.log('BAD finshed!')
        event.returnValue = 'pong'
    }, 5000)
})
