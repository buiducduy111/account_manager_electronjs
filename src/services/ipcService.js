import { ipcMain } from 'electron'
import * as dbService from './dbService'

export async function ipcMainHandle() {
    ipcMain.handle('get-websites', async () => {
        return await dbService.getWebsites();
    }),
    ipcMain.handle('add-website', async (event, websiteObjAsJson) => {
        console.log(websiteObjAsJson);
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
}