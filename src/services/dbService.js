const cryptoJs = require('crypto-js');
const path = require('path');
const ENCRYPT_KEY = 'giaiphapmmo.net';
import {getDatabaseFileLocation, getDataLocation} from './settingService'

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'assets', 'db', 'database_test.db')
    },
    useNullAsDefault: false
});

export const initDB = async () => {
    const dbFile = await getDatabaseFileLocation();

    knex = require('knex')({
        client: 'sqlite3',
        connection: {
          filename: dbFile
        },
        useNullAsDefault: false
    });
}

// CRUD for websites --------------------------------------
export const addWebsite = async (websiteObj) => {
    let websites = await knex('websites').insert(websiteObj, ['id', 'name', 'url', 'icon']);
    await addWebsitesIconSrc(websites);
    return websites;
}

export const getWebsites = async (search = '') => {
    let websites = await knex('websites').where('name', 'like', `${search}%`).select().orderBy('name');
    await addWebsitesIconSrc(websites);
    return websites;
}


export const updateWebsite = async (websiteObj) => {
    let websites = await knex('websites').where('id', websiteObj.id).update(
        {
            name: websiteObj.name,
            url: websiteObj.url,
            icon: websiteObj.icon
        }, ['id', 'name', 'url', 'icon']);
    await addWebsitesIconSrc(websites);
    return websites;
}

export const delWebsite = async (id) => {
    const temp = await knex('accounts').where('website_id', id).count();
    const accountNum = temp[0]['count(*)'];

    if (accountNum > 0)
        return false;
      
    const delRows = await knex('websites').where('id', id).del();
    return delRows > 0;
}

const addWebsitesIconSrc = async (websites) => {
    const saveLocation = await getDataLocation();

    websites.forEach(item => {
        item.src = item.icon;

        if (!item.src.includes('http')) {
            item.src = 'file:///'+saveLocation+'/icons/'+item.src;
            item.src = item.src.replaceAll('\\', '/');
        }
    });
}


// CRUD for accounts --------------------------------------
export const addAccount = async (accountObj) => {
    accountObj.password = cryptoJs.AES.encrypt(accountObj.password, ENCRYPT_KEY).toString();
    const result = await knex('accounts').insert(accountObj, ['id', 'username', 'password', 'more_info', 'website_id']);
    
    if (result.length > 0)
        result[0].password = cryptoJs.AES.decrypt(result[0].password, ENCRYPT_KEY).toString(cryptoJs.enc.Utf8);

    return result;
}

export const getAccounts = async (websiteId) => {
    const accounts = await knex('accounts').where('website_id', websiteId).select().orderBy('username');
    accounts.forEach(element => {
        element.password = cryptoJs.AES.decrypt(element.password, ENCRYPT_KEY).toString(cryptoJs.enc.Utf8);
    });
    return accounts;
}

export const getAccount = async (domain, username) => {
    const websites = await knex('websites').where('url', 'like', `%${domain}%`).select();
    if (websites.length == 0)
        return undefined;

    const accounts = await knex('accounts').where({website_id: websites[0].id, username: username}).select();
    if (accounts.length == 0)
        return undefined;

    accounts.forEach(element => {
        element.password = cryptoJs.AES.decrypt(element.password, ENCRYPT_KEY).toString(cryptoJs.enc.Utf8);
    });

    return accounts[0];
}

export const updateAccount = async (accountObj) => {
    accountObj.password = cryptoJs.AES.encrypt(accountObj.password, ENCRYPT_KEY).toString();
    return await knex('accounts').where('id', accountObj.id)
        .update(accountObj, ['id', 'username', 'password', 'more_info', 'website_id']);
}

export const delAccount = async (id) => {
    const delRows = await knex('accounts').where('id', id).del();
    return delRows > 0;
}

// Settings ---------------------------------------------------
export const getPin = async () => {
    const pins = await knex('settings').where('name', 'pin').select('value');
    if (pins.length == 0){
        const defaultPin = cryptoJs.AES.encrypt('123456', ENCRYPT_KEY).toString();
        await knex('settings').insert({name: 'pin', value: defaultPin});
        return '123456';
    }
    
    const pin = pins[0]['value'];
    const rawPin = cryptoJs.AES.decrypt(pin, ENCRYPT_KEY).toString(cryptoJs.enc.Utf8);

    return rawPin
}

export const setPin = async (newPin) => {
    const pin = cryptoJs.AES.encrypt(newPin, ENCRYPT_KEY).toString();
    await knex('settings').where('name', 'pin').update({value: pin});
}

// DB --------------------------------------------------------
export const destroy = () => {
    knex.destroy();
}