// main/index.ts
import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// import favicon from '../../resources/favicon.ico?asset'
import { appExpress } from './server'
// import { keyboard, Key } from '@nut-tree/nut-js'

// Import the node-key-sender library
// import * as ks from 'node-key-sender'

const favicon = join(__dirname, '../../resources/favicon.ico?asset')

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon: favicon,
    title: 'My App',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { favicon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      // devTools: true,
      // webSecurity: true,
      nodeIntegration: true
    }
  })
  mainWindow.on('ready-to-show', () => {
    // mainWindow.show()
    // open dev tools automatically if not in production
    // mainWindow.webContents.openDevTools()
    // Simulate pressing W, A, S, D using node-key-sender
    // ks.keyTap('w')
    // ks.keyTap('a')
    // ks.keyTap('s')
    // ks.keyTap('d')
    mainWindow.minimize()
    openNotepadAndWrite().catch((error) => {
      console.error('Error:', error)
    })
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer based on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault()
    // Handle navigation internally (e.g., through React Router)
    // You may need to adjust this logic based on your specific requirements.
    mainWindow.webContents.send('navigate', url)
  })
}

async function openNotepadAndWrite(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Add a delay of 1000ms
  // await keyboard.type(Key.A, Key.S, Key.D, Key.F)
  // await keyboard.type('Hello, world!')
}

appExpress.listen(import.meta.env.M_VITE_EXPRES_PORT || 8085, () => {
  console.log(`Server is running on http://localhost:${import.meta.env.M_VITE_EXPRES_PORT || 8085}`)
})

// Continue with the rest of your app initialization code...

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
