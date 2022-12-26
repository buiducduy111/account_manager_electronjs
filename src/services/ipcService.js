import { ipcMain, dialog } from 'electron'
import * as dbService from './dbService'
import * as settingService from './settingService'
import {getIcon} from './automationService'

export async function ipcMainHandle() {
    ipcMain.handle('get-websites', async (event, search = '') => {
        return await dbService.getWebsites(search);
    }),
    ipcMain.handle('add-website', async (event, websiteObjAsJson) => {
        const websiteObj = JSON.parse(websiteObjAsJson);
        return await dbService.addWebsite(websiteObj);
    }),
    ipcMain.handle('update-website', async (event, websiteObjAsJson) => {
        const websiteObj = JSON.parse(websiteObjAsJson);
        return await dbService.updateWebsite(websiteObj);
    }),
    ipcMain.handle('del-website', async (event, id) => {
        return await dbService.delWebsite(id);
    }),

    ipcMain.handle('get-accounts', async (event, websiteId) => {
        return await dbService.getAccounts(websiteId);
    }),
    ipcMain.handle('add-account', async (event, accountObjAsJson) => {
        const accountObj = JSON.parse(accountObjAsJson);
        return await dbService.addAccount(accountObj);
    }),
    ipcMain.handle('update-account', async (event, accountObjAsJson) => {
        const accountObj = JSON.parse(accountObjAsJson);
        return await dbService.updateAccount(accountObj);
    }),
    ipcMain.handle('del-account', async (event, id) => {
        return await dbService.delAccount(id);
    }),

    ipcMain.handle('get-pin', async () => {
        return await dbService.getPin();
    }),
    ipcMain.handle('set-pin', async (event, pin) => {
        return await dbService.setPin(pin);
    })

    ipcMain.handle('get-icon', async (event, url) => {
        return await getIcon(url);
    })

    ipcMain.handle('show-confirm', async (event, message) => {
        return await dialog.showMessageBoxSync(null, {
            message: message,
            buttons: ['No', 'Yes'],
            title: 'Confirm'
        })
    })

    ipcMain.handle('show-msg', async (event, message) => {
        return await dialog.showMessageBoxSync(null, {
            message: message,
            title: 'Message'
        })
    })

    ipcMain.handle('open-folder-dialog', async (event, title) => {
        return await dialog.showOpenDialogSync(null, {
            title: title,
            properties : ['openDirectory']
        })
    })

    ipcMain.handle('set-data-location', async (event, saveLocation) => {
        return await settingService.setDataLocation(saveLocation);
    })

    ipcMain.handle('check-database', async () => {
        return await settingService.checkDatabase();
    })

    ipcMain.handle('init-database', async () => {
        return await dbService.initDB();
    })
}