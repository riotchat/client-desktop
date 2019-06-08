import path from 'path';
import { app, BrowserWindow } from 'electron';
let mainWindow: BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ frame: false, show: false });
    mainWindow.on('ready-to-show', () => { mainWindow.show(); });
    mainWindow.loadFile(path.join(__dirname, '..', '..', 'index_dev.html'));
}

app.on('ready', () => {
    createWindow();
});