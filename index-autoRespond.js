const puppeteer = require('puppeteer');
const autoRespond = require('./modules/autoRespond');
const podio = require('./podio');
(async function(){
    const page = await podio.initialize();
    try{
        await autoRespond(page,true);
    }catch(e){
        console.log("Some error occured on autoRespond function inside index-autoRespond")
    }
})()
