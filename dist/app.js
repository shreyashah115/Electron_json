const electron = require('electron')
const {app, BrowserWindow} = electron

app.on('ready', function() {

 var mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });


  mainWindow.loadURL('file://' + __dirname + '/index.html');
   
//    exports.openWindow = () => {
//    var mainWindow = new BrowserWindow({width: 400, height: 200})
//    mainWindow.loadURL('file://' + __dirname + '/list.html');
//    mainWindow.webContents.openDevTools()
  
// }
   mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
