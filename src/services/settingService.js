const fs = require('fs');
const path = require('path');
const app = require('electron').app;
import * as dbService from './dbService'

const settingFolder = path.join(app.getPath('documents'), 'accmgr');
const settingFile = path.join(settingFolder, 'setting.dat');


export const setDataLocation = async (saveLocation) => {
    if (! await fs.existsSync(saveLocation))
        return false;

    const databaseFile = path.join(saveLocation, 'database.db');
    if (! await fs.existsSync(databaseFile))
        await fs.copyFileSync(__dirname+'/assets/db/empty_db.db', databaseFile);

    await fs.writeFileSync(settingFile, saveLocation);
    dbService.initDB();
    return true;
}


export const getDataLocation = async () => {
    try {
        const saveLocation = await fs.readFileSync(settingFile, 'utf8');
        return saveLocation;
    } catch {
        return undefined;
    }
    
}

export const checkDatabase = async () => {
    await initSettingFolder();

    if (!await fs.existsSync(settingFile))
        return false;

    const saveLocation = await fs.readFileSync(settingFile, 'utf8');
    const dbFile = path.join(saveLocation, 'database.db');

    return await fs.existsSync(dbFile);
}

export const getDatabaseFileLocation = async () => {
    if (!await checkDatabase())
        return undefined;

    const saveLocation = await fs.readFileSync(settingFile, 'utf8');
    const dbFile = path.join(saveLocation, 'database.db');

    return dbFile;
}
 
const initSettingFolder = async () => {
    if (!await fs.existsSync(settingFolder))
        await fs.mkdirSync(settingFolder);
}