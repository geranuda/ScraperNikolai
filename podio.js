const GoLogin = require('gologin');
const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const randomUseragent = require('random-useragent');
//const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';

const preparePageForTests = require('./modules/preparePageForTests');

const LOGIN_PODIO = 'https://podio.com/login';
const PROPERTIES_URL = 'https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline#30';


let browser = null;
let page = null; //why is this null?
let sellersArray = [];

const podio = {
  glinitialize: async ()=>{
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
    await page.goto(LOGIN_PODIO);
    await page.waitForSelector('#email');
    console.log("🎁🎁🎁🎁🎁Login page Selector is ready");
    return page;
  },
    initialize: async() => {
  
      browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        //userDataDir: './userData',
        args: [
          '--no-sandbox', '--disable-setuid-sandbox', "--disable-notifications",
          '--user-data-dir=C:/Users/52322/AppData/Local/Google/Chrome/User Data/Profile 1',
        ], ignoreHTTPSErrors: true, dumpio: false
      });
      page = await browser.newPage();
      const userAgent = randomUseragent.getRandom();
      //const UA = userAgent || USER_AGENT;
      await page.setViewport({
        width: 1920 + Math.floor(Math.random() * 100),
        height: 768 + Math.floor(Math.random() * 100),
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: false,
        isMobile: false,
    });
    //await page.setUserAgent(UA);
    await page.setJavaScriptEnabled(true);
    await page.setDefaultNavigationTimeout(0);
      
      await page.goto(LOGIN_PODIO);
      await page.waitForSelector('#email');
      return page;
    },
  
    login: async(EMAIL, PASSWORD, page) => {
  
      await page.click('#email');
      await page.type('#email', EMAIL, {delay: 25});
      await page.type('#password', PASSWORD, {delay: 25});
      await page.keyboard.press('Enter');
      await page.waitForSelector('#status_value');
      await page.goto(PROPERTIES_URL);
      await page.waitForSelector('.content', {timeout: 0});
    
    },

    applyFilters: async() => {
        // click table and press details
        await page.click('#wrapper > section > header > nav > ul.app-view-tools > li.app-view-tools__item.layouts.tooltip > span');
        await page.waitForSelector('#wrapper > div.simple-balloon.app-layout-selector-dropdown.gravity-n.arrow-left > div > div > ul > li.dropdown-label.current > div > div.bd');
        await page.click('#wrapper > div.simple-balloon.app-layout-selector-dropdown.gravity-n.arrow-left > div > div > ul > li.dropdown-label.current > div > div.bd');
        await page.waitForSelector('.content', {timeout: 0});
        //click filter and wait
        await page.click('#wrapper > section > header > nav > ul.app-filter-tools > li.app-view-tools__item.filters.tooltip > span');
        await page.waitForSelector('#wrapper > div.simple-balloon.app-filters-popover.gravity-n.arrow-left > div > div > div.navigation > ul > li:nth-child(11) > div > div.bd > a');
        await page.click('#wrapper > div.simple-balloon.app-filters-popover.gravity-n.arrow-left > div > div > div.navigation > ul > li:nth-child(11) > div > div.bd > a');
        // wait deal status input
        await page.waitForSelector('#wrapper > div.simple-balloon.app-filters-popover.gravity-n.arrow-left > div > div > div.content > div > div > div > div.clear-all-wrapper > ul > li > div > div.bd.input-box > label');
        // deal status and siga siga
        
        // click input deal status
        await page.click('#wrapper > div.simple-balloon.app-filters-popover.gravity-n.arrow-left > div > div > div.content > div > div > div > div.clear-all-wrapper > ul > li > div > div.bd.input-box > label');
        // write
        await page.keyboard.type('For Verbal Offer');
        
        await page.waitFor(2000);
        await page.keyboard.press('ArrowDown');
        await page.waitFor(2000);
        await page.keyboard.press('Enter');
        await page.waitFor(2000);
        // click close assigned
        await page.click('#wrapper > div.simple-balloon.app-filters-popover.gravity-n.arrow-left > div > div > div.navigation > ul > li:nth-child(12) > div > div.bd > a');
        await page.waitForSelector('#wrapper > div.simple-balloon.app-filters-popover.gravity-n.arrow-left > div > div > div.content > div > div > div > div.clear-all-wrapper > ul > li > div > div.bd.input-box > input[type=text]');
        await page.type('#wrapper > div.simple-balloon.app-filters-popover.gravity-n.arrow-left > div > div > div.content > div > div > div > div.clear-all-wrapper > ul > li > div > div.bd.input-box > input[type=text]', 'g' ,{delay: 25});
        await page.waitFor(2000);
        await page.keyboard.press('ArrowDown');
        await page.waitFor(2000);
        await page.keyboard.press('Enter');
        await page.waitFor(2000);
        
        // go properties list whith filters assigned
        await page.goto(PROPERTIES_URL);
        console.log("going to properties url")
        await page.waitForSelector('.content', {timeout: 0});
        // TODO OK HASTA ACÁ

    },
  
    getSellers: async(page) => {
      
      let allCustomers =[];
        // todo ok
        // debugger;
        // take all tr(30 se espera)
        await page.waitForSelector(".content", {timeout: 0})
          sellersArray = await page.evaluate( () => {
            let returnData = [];
            let allSelectors = document.querySelectorAll('.content tr')
            for(element of allSelectors){
              returnData.push({
                propertyAddress: element.querySelector("td:nth-child(2)") && element.querySelector("td:nth-child(2)").innerText,
                firstName: element.querySelector("td:nth-child(6)") && element.querySelector("td:nth-child(6)").innerText.split(" ")[0],
                lastName: element.querySelector("td:nth-child(6)") && element.querySelector("td:nth-child(6)").innerText.split(" ")[1],
                PhoneNumber: element.querySelector("td:nth-child(7)") && element.querySelector("td:nth-child(7)").innerText,
                })
            }
            return returnData;
        })

        for(let i=0; i<sellersArray.length; i++){
          console.log(sellersArray[i])
          if(i == sellersArray.length-1){
           return allCustomers
          }
          if(sellersArray[i].firstName == sellersArray[i+1].firstName && sellersArray[i].lastName == sellersArray[i+1].lastName){
              console.log("move on because the next seller matches with the current")
              continue;
          }
          allCustomers.push({
            propertyName: sellersArray[i].propertyAddress,
            firstName: sellersArray[i].firstName,
            lastName: sellersArray[i].lastName,
            phoneNumber: sellersArray[i].PhoneNumber.replace("(Work)", " ")
          })
        }
     return allCustomers
  
  },
    changeStatus: async(page) => {
      let AllStatus = [];
    console.log("Change Status initialized and ready to wait for selector 🧨")
    await page.waitForSelector('#wrapper > section > section.app-wrapper__content > main > div > div.scrollable > table > tbody > tr:nth-child(1) > td:nth-child(2)');
    console.log("Selector waited we are ready to fire the click 🎈🏹")
    await page.click('#wrapper > section > section.app-wrapper__content > main > div > div.scrollable > table > tbody > tr:nth-child(1) > td:nth-child(2)');
    console.log("Selector clicked will click status button indicated🤠🧐👀")


  }
/*
  getMessages: async() => {

    let allCustomersMessages =[];
        // todo ok
        // debugger;
        // take all tr(30 se espera)
        await page.waitForSelector(".content", {timeout: 0})
          sellersMessagesArray = await page.evaluate( () => {
            let returnData = [];
            let allSelectors = document.querySelectorAll('div.chatBody')
            for(element of allSelectors){
              returnData.push({
                firstName: element.querySelector("td:nth-child(6)") && element.querySelector("td:nth-child(6)").innerText.split(" ")[0],
                lastName: element.querySelector("td:nth-child(6)") && element.querySelector("td:nth-child(6)").innerText.split(" ")[1],
                PhoneNumber: element.querySelector("td:nth-child(7)") && element.querySelector("td:nth-child(7)").innerText,
                Messages: element.querySelector("td:nth-child(7)") && element.querySelector("td:nth-child(7)").innerText,

                })
            }
            return returnData;
        })

        for(let i=0; i<sellersMessagesArray.length; i++){
          console.log(sellersMessagesArray[i])
          if(i == sellersMessagesArray.length-1){
            return allCustomersMessages
          }
          if(sellersMessagesArray[i].firstName == sellersMessagesrray[i+1].firstName && sellersArray[i].lastName == sellersArray[i+1].lastName){
              console.log("move on because the next seller matches with the current")
              continue;
          }
          allCustomersMessages.push({
            firstName: sellersMessagesArray[i].firstName,
            lastName: sellersMessagesArray[i].lastName,
            phoneNumber: sellersMessagesArray[i].PhoneNumber.replace("(Work)", " "),
            Messages: sellersMessagesArray[i].Messages,
          })
        }
        return allCustomersMessages

  }*/
}
  
  module.exports = podio;