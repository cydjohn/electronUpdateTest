var electronInstaller = require('electron-winstaller');
const path = require('path')
resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './out/MyApp-win32-ia32',
    outputDirectory: './windows32',
    authors: 'cyd',
    exe: 'MyApp.exe',
    noMsi: true,
    outputDirectory: path.join('./out/', 'windows-installer'),
    setupExe: 'ElectronAPIDemosSetup.exe',
    skipUpdateIcon: true
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));