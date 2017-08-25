// Access running Electron server
const electron = window.require('electron')

export const fs = electron.remote.require('fs')
export const ipcRenderer = electron.ipcRenderer
