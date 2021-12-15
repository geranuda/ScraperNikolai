const puppeteer = require('puppeteer');
const autoRespond = require('./modules/autoRespond');
const podio = require('./podio');
(async function(){
    const page = await podio.initialize();
    await autoRespond(page,true);
})()
