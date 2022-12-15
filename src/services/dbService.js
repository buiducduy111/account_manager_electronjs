const cryptoJs = require('crypto-js');
const ENCRYPT_KEY = 'giaiphapmmo.net';

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: 'database_test.db'
    },
    useNullAsDefault: false
});

// CRUD for websites --------------------------------------
export const addWebsite = async (websiteObj) => {
    return await knex('websites').insert(websiteObj, ['id', 'name', 'url', 'icon']);
}

export const getWebsites = async (search = '') => {
    return await knex('websites').where('name', 'like', `${search}%`).select().orderBy('name');
}

export const updateWebsite = async (websiteObj) => {
    return await knex('websites').where('id', websiteObj.id).update(websiteObj, ['id', 'name', 'url', 'icon']);
}

export const delWebsite = async (id) => {
    const temp = await knex('accounts').where('website_id', id).count();
    const accountNum = temp[0]['count(*)'];
    
    if (accountNum == 0)
        return false;
    
    const delRows = await knex('websites').where('id', id).del();
    return delRows > 0;
}

// CRUD for accounts --------------------------------------
export const addAccount = async (accountObj) => {
    return await knex('accounts').insert(accountObj, ['id', 'username', 'password', 'more_info', 'website_id']);
}

export const getAccounts = async (websiteId) => {
    return await knex('accounts').where('website_id', websiteId).select().orderBy('username');
}

export const updateAccount = async (accountObj) => {
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
        const defaultPin = '123456';
        await knex('settings').insert({name: 'pin', value: cryptoJs.AES.encrypt(defaultPin, ENCRYPT_KEY).toString()});
        return defaultPin;
    }
    
    const pin = pins[0]['value'];
    const rawPin = cryptoJs.AES.decrypt(pin, ENCRYPT_KEY).toString(cryptoJs.enc.Utf8);
    console.log(rawPin);
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