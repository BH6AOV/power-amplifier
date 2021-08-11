// main.js
const { app, BrowserWindow } = require("electron");

require("./core/tcp-client");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 640,
    height: 366,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL("http://localhost:8080/");

  // 打开开发者工具
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});
