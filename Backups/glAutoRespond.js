const puppeteer = require('puppeteer');
const GoLogin = require('gologin');
const autoRespond = require('./modules/autoRespond');


(async () =>{
    const GL = new GoLogin({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWM5ZDAwZDVkMzFkYWM3MWZlNmY0ZjEiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2MWNhMDQ4ZmY0YWY4NDMxNzY3YTA0MWEifQ.tRM4HDbup4WY7ZlgvSUgmuyFyPH5GLdgKEKKmXTEZbM',
        profile_id: '61ca110be70dd5be2a5f1491',
    });

    const { status, wsUrl } = await GL.start().catch((e) => {
      console.trace(e);
      return { status: 'failure' };
    });

    if (status !== 'success') {
      console.log('Invalid status');
      return;
    }

    const browser = await puppeteer.connect({
        browserWSEndpoint: wsUrl.toString(), 
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto('https://phone.smrt.studio/login/');   
    
    (async function(){
        try{
            await autoRespond(page,true);
        }catch(e){
            console.log("Some error occured on autoRespond function inside index-autoRespond")
        }
    })()

    //await browser.close();
    //await GL.stop();
})();