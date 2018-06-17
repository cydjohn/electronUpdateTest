if (require('electron-squirrel-startup')) return;

const {app, BrowserWindow} = require('electron')
const {autoUpdater } = require('electron')
// import { autoUpdater } from "electron-updater"
// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};
  const path = require('path')
  const url = require('url')
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})
  
    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  
    // Open the DevTools.
    win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

const server = 'https://hazel-server-npjnhmqmmx.now.sh'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

// console.log(feed)
autoUpdater.setFeedURL(feed)

autoUpdater.checkForUpdates()



autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})




//使用electron-builder配合electron-updater实现自动更新

// 注意这个autoUpdater不是electron中的autoUpdater
// const { autoUpdater } = require('electron-updater')

// // 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
// const updateHandle =  function(){
//     let message={
//       error:'检查更新出错',
//       checking:'正在检查更新……',
//       updateAva:'检测到新版本，正在下载……',
//       updateNotAva:'现在使用的就是最新版本，不用更新',
//     };
//     const os = require('os');
//     autoUpdater.setFeedURL('https://hazel-server-npjnhmqmmx.now.sh');
//     autoUpdater.on('error', function(error){
//       sendUpdateMessage(message.error)
//     });
//     autoUpdater.on('checking-for-update', function() {
//       sendUpdateMessage(message.checking)
//     });
//     autoUpdater.on('update-available', function(info) {
//         sendUpdateMessage(message.updateAva)
//     });
//     autoUpdater.on('update-not-available', function(info) {
//         sendUpdateMessage(message.updateNotAva)
//     });
    
//     // 更新下载进度事件
//     autoUpdater.on('download-progress', function(progressObj) {
//         mainWindow.webContents.send('downloadProgress', progressObj)
//     })
//     autoUpdater.on('update-downloaded',  function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
//         ipcMain.on('isUpdateNow', (e, arg) => {
//             //some code here to handle event
//             autoUpdater.quitAndInstall();
//         })
//         mainWindow.webContents.send('isUpdateNow')
//     });
    

//     //执行自动更新检查
//     autoUpdater.checkForUpdates();
// }

// // 通过main进程发送事件给renderer进程，提示更新信息
// // mainWindow = new BrowserWindow()
// function sendUpdateMessage(text){
//     // mainWindow.webContents.send('message', text)
//     console.log(text)
// }


// updateHandle()