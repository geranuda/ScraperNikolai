const puppeteer = require('puppeteer-extra');
const podio = require('./podio');
const page = await browser.newPage();

const LOGIN_PODIO = 'https://podio.com/login';
const PROPERTIES_URL = 'https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline#30';


let browser = null;
let page = null; //why is this null?
let sellersArray = [];
const podio = {
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
        //const userAgent = randomUseragent.getRandom();
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

      changeStatus: async() => {
        await page.click('#wrapper > section > header > nav > ul.app-view-tools > li.app-view-tools__item.layouts.tooltip > span');

      }