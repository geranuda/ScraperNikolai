//Nico es la verga
const puppeteer = require('puppeteer');
const sendMessage = require('./modules/sendMessage');
const podio = require('./podio');
const localDb = require('./localDb');
const podioApi = require('./modules/podioApi');
const processCustomersList = require('./modules/processCustomersList');

(async () => {
  //const LOGIN_SMRTPHONE = 'https://phone.smrt.studio/login';
  //const EMAIL = 'closertwoasc@gmail.com';
  //const PASSWORD = 'Closer2two!' //request password to admin before test;
  

  const page = await podio.initialize();
  // await podio.login(EMAIL, PASSWORD, page);
  // await podio.applyFilters(); // ok


  // let customersList = await podio.getSellers(page);

  let access_token = await podioApi.init();
  let rawCustomersList = await podioApi.getData("https://api.podio.com/item/app/25804586/filter/49714622", access_token);


  // Process customers list to extract the required data
  let customersList = await processCustomersList(rawCustomersList);
  console.log("🎁🎁🎁🎁allCustomers", customersList)


  //for (const user of customersList) {
    //console.log("🍕🍕🍕🍕🍕🍕INserting ", user)
    //localDb.insert(user)
  //}
  //console.log("🍕🍕🍕🍕🍕🍕User inserted(first)", customersList[0])
  //localDb.getUsers().then(users => console.log("Users in the DB(first) ",users[0]));
  /*
  await page.waitForNavigation( 3000 );
  if (await page.$('#seller-last-name') !== null) {
      await page.click('#buttonToClick');
    } else {
     // await page.waitForSelector('#otherButton');
      await page.click('body > div.content-overlay.items-section.background-animate.is-animated.background > div > div.item-overlay.item-overlay--animate.js-overlay-content-area > div > div > div > div');
    }
  */
let i = 0;
  for (data of customersList){
    i++
    if(i == 1){
      console.log("Sending message to", data.firstName);
      await sendMessage(data, page, true)
      console.log("sent message to", data.firstName);
    }else{
      console.log("Sending message to", data.firstName);
      await sendMessage(data, page, false)
      console.log("sent message to", data.firstName);
    }
    console.log("Wait for 5 seconds before sending next message")
    //await page.waitFor(5000) Hasta aqui ok modifique esos 5000 segundos a 3000
    await page.waitFor(2000)
  }
  //await page.waitForSelector('');


  //await browser.close();
  // debugger;
})();