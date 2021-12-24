const puppeteer = require('puppeteer');

const LOGIN_PODIO = 'https://podio.com/login';
const PROPERTIES_URL = 'https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline#30';


let browser = null;
let page = null;
let sellersArray = [];

const podio = {

    initialize: async() => {
  
      browser = await puppeteer.launch({
        headless: false,
        args: [
          '--disable-web-security',
        ],
        ignoreHTTPSErrors: true,
        defaultViewport: {
            width: 1366,
            height: 900
        }
      });
      page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(LOGIN_PODIO);
      await page.waitForSelector('#email');
      return page;
    },
  
    login: async(EMAIL, PASSWORD) => {
  
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
        
        await page.waitForTimeout(2000);
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(2000);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);
        // click close assigned
        await page.click('#wrapper > div.simple-balloon.app-filters-popover.gravity-n.arrow-left > div > div > div.navigation > ul > li:nth-child(12) > div > div.bd > a');
        await page.waitForSelector('#wrapper > div.simple-balloon.app-filters-popover.gravity-n.arrow-left > div > div > div.content > div > div > div > div.clear-all-wrapper > ul > li > div > div.bd.input-box > input[type=text]');
        await page.type('#wrapper > div.simple-balloon.app-filters-popover.gravity-n.arrow-left > div > div > div.content > div > div > div > div.clear-all-wrapper > ul > li > div > div.bd.input-box > input[type=text]', 'g' ,{delay: 25});
        await page.waitForTimeout(2000);
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(2000);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);
        
        // go properties list whith filters assigned
        await page.goto(PROPERTIES_URL);
        console.log("going to properties url")
        await page.waitForSelector('.content', {timeout: 0});
        // TODO OK HASTA ACÁ

    },
  
    getSellers: async() => {
      
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