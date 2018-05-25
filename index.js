const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
      width: 1000,
      height: 800,
      icon: path.join(__dirname, 'img/1024x0124.png')
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  /*win.webContents.openDevTools()*/

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  var menu = Menu.buildFromTemplate([
      {
          label: 'Menu',
          submenu: [
              {label:'About BackSlash Chat', click () {openAboutWindow();}},
              {label:'BackSlash Linux Website',
                click() { 
                    shell.openExternal('https://www.backslashlinux.com')
                } 
              },
              {type:'separator'},
              {label:'Exit',
                click() { 
                    app.quit() 
                },
               accelerator: 'CmdOrCtrl+Q'
              }
          ]
      }
  ])
  Menu.setApplicationMenu(menu); 
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
var newWindow = null;

 function openAboutWindow() {
  if (newWindow) {
   newWindow.focus()
   return;
 }

 newWindow = new BrowserWindow({
  height: 240,
  resizable: false,
  width: 320,
  title: "About BackSlash Live Chat",
  minimizable: false,
  fullscreenable: false
 });

 newWindow.loadURL('file://' + __dirname + '/about.html');

  newWindow.on('closed', function () {
  newWindow = null;
 });
};