const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
    const startUrl = 'http://localhost:3000'; // Development server URL
    const productionUrl = url.format({
        pathname: path.join(__dirname, 'e-learning-frontend-admin/build', 'index.html'),
        protocol: 'file:',
        slashes: true,
    });

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadURL(startUrl);

    // Uncomment this line for production build
    // win.loadURL(productionUrl);

    win.webContents.openDevTools(); // Open DevTools by default
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
