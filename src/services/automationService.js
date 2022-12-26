const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const settingService = require('./settingService');

export const getIcon = async (websiteUrl) => {
    const saveLocation = await settingService.getDataLocation();
    const DOWNLOAD_PATH = path.join(saveLocation, 'icons');

    if (!await fs.existsSync(DOWNLOAD_PATH))
        await fs.mkdirSync(DOWNLOAD_PATH);

    // Get icon url
    let options = {headless: true};

    // If production
    if(__dirname.includes('resources')) {
        options = {
            headless: true,
            executablePath: __dirname.replace('app.asar', 'node_modules/puppeteer/.local-chromium/win64-1045629/chrome-win/chrome.exe')
        }
    }
    let iconUrl = '';
    const urlObj = new URL(websiteUrl);

    try {
        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();

        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if(req.resourceType() === 'image'){
                req.abort();
            }
            else {
                req.continue();
            }
        });

        await page.goto(websiteUrl);

        iconUrl = await page.$eval("link[rel='icon'],link[rel='shortcut icon']", el => el.href);
        await browser.close();

        if (iconUrl == undefined)
            return undefined;

        if (!iconUrl.includes('http')){
            iconUrl = urlObj.origin + iconUrl;
        }
        
    // eslint-disable-next-line no-empty
    } catch {}
    console.log('Icon: '+ iconUrl);

    // Download icon url
    try {
        const desFilenName = urlObj.hostname+'.png';
        const desFileLocation = DOWNLOAD_PATH+'\\'+desFilenName;

        await new Promise((resolve) => {
            const file = fs.createWriteStream(desFileLocation);
            const options = {
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
                }
            };
            https.get(iconUrl, options, function(response) {
                response.pipe(file);

                file.on("finish", () => {
                    file.close();
                    console.log('Download icon completed');
                    return resolve(desFilenName);
                });
            });
        });
        
        return desFilenName;
    } catch {
        return iconUrl;
    }  
};