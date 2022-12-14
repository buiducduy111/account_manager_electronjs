const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');
const path = require('path');

const DOWNLOAD_PATH = path.join(__dirname, 'icons');

export const getIcon = async (websiteUrl) => {
    if (!await fs.existsSync(DOWNLOAD_PATH))
        await fs.mkdirSync(DOWNLOAD_PATH);

    // Get icon url
    const browser = await puppeteer.launch({headless: true});
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

    const urlObj = new URL(websiteUrl);
    let iconUrl = await page.$eval("link[rel='icon'],link[rel='shortcut icon']", el => el.href);
    await browser.close();

    if (iconUrl == undefined)
        return undefined;

    if (!iconUrl.includes('http')){
        iconUrl = urlObj.origin + iconUrl;
    }
    
    console.log(iconUrl);
    // Download icon url
    const desFileLocation = DOWNLOAD_PATH+'\\'+urlObj.hostname+'.png';

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
                return resolve(desFileLocation);
            });
        });
    });
    
    return desFileLocation;
};