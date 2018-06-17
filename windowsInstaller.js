var electronInstaller = require('electron-winstaller');
const path = require('path')
resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './out/MyApp-win32-ia32',
    //appDirectory: './dist/win-unpacked',
    outputDirectory: './windows32',
    authors: 'cyd',
    exe: 'MyApp.exe',
    outputDirectory: path.join('./out/', 'windows-installer'),
    setupExe: 'ElectronAPIDemosSetup.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));