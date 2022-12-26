const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('database', {
    getWebsites: (search) => ipcRenderer.invoke('get-websites', search),
    addWebsite: (websiteObjAsJson) => ipcRenderer.invoke('add-website', websiteObjAsJson),
    updateWebsite: (websiteObjAsJson) => ipcRenderer.invoke('update-website', websiteObjAsJson),
    delWebsite: (id) => ipcRenderer.invoke('del-website', id),

    getAccounts: (websiteId) => ipcRenderer.invoke('get-accounts', websiteId),
    addAccount: (accountObjAsJson) => ipcRenderer.invoke('add-account', accountObjAsJson),
    updateAccount: (accountObjAsJson) => ipcRenderer.invoke('update-account', accountObjAsJson),
    delAccount: (id) => ipcRenderer.invoke('del-account', id),

    getPin: () => ipcRenderer.invoke('get-pin'),
    setPin: (pin) => ipcRenderer.invoke('set-pin', pin)
})

contextBridge.exposeInMainWorld('automation', {
    getIcon: (url) => ipcRenderer.invoke('get-icon', url)
})

contextBridge.exposeInMainWorld('system', {
    showConfirm: (message) => ipcRenderer.invoke('show-confirm', message),
    showMsg: (message) => ipcRenderer.invoke('show-msg', message),
    showOpenDialog: (title) => ipcRenderer.invoke('open-folder-dialog', title),
})

contextBridge.exposeInMainWorld('setting', {
    setDataLocation: (saveLocation) => ipcRenderer.invoke('set-data-location', saveLocation),
    checkDatabase: () => ipcRenderer.invoke('check-database'),
    initDatabase: () => ipcRenderer.invoke('init-database'),
})
