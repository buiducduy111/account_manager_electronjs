const http = require('http');
const url = require('url'); 
import { dialog } from 'electron'
import * as dbService from './dbService'

export const startLocalServer = async () => {
    http.createServer(function async (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var urlObj = url.parse(req.url, true);
        
        if (urlObj.pathname === '/submit') {
            const query = urlObj.query;
            const username = query.username;
            const password = query.password;
            const domain = query.url; // is hostname like: www.giaiphapmmo.net

            res.write('Reviced your request');
            
            if (hasPasswordUpdate(domain, username, password).then((result) => {
                if (result){
                    dialog.showMessageBox(null, {
                        message: 'Update password of account ['+username+'] in '+domain,
                        buttons: ['No', 'Yes'],
                        title: 'Confirm'
                    }).then(async (response) => {
                        const btnIndex = response.response;
                        if (btnIndex === 1){
                            await updateAccountPassword(domain, username, password);
                            console.log('Updated password for ['+username+'] in '+domain);
                        }
                    });
                }
                
            }).catch(() => {}));
        }
        
        res.end();
    }).listen(8095);
}

const updateAccountPassword = async (domain, username, password) => {
    const account = await dbService.getAccount(domain, username);
    if (account == undefined || account.password === password)
        return;

    account.password = password;
    await dbService.updateAccount(account);
}

const hasPasswordUpdate = async (domain, username, password) => {
    const account = await dbService.getAccount(domain, username);
    if (account != undefined && account.password != password)
        return true;

    return false;
}
