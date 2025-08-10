const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // Kreiraj browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, 'icon.png') // opciono - dodaj ikonu ako je imaš
  })

  // Učitaj Next.js aplikaciju
  mainWindow.loadURL('http://localhost:3001')

  // Otvori DevTools u development modu
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  // Handle window closed
  mainWindow.on('closed', function () {
    // Dereference the window object
    mainWindow = null
  })
}

// Ova metoda će biti pozvana kada se Electron završi inicijalizacija
app.whenReady().then(createWindow)

// Quit when all windows are closed
app.on('window-all-closed', function () {
  // Na macOS je uobičajeno da aplikacije ostaju aktivne dok se korisnik ne odjavi eksplicitno
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // Na macOS je uobičajeno da se kreira novi window u aplikaciji kada se klikne na dock ikonu
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
