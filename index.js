const puppeteer = require('puppeteer');
(async () => {
  const LOGIN_PODIO = 'https://podio.com/login';
  const LOGIN_SMRTPHONE = 'https://phone.smrt.studio/login';
  const PROPERTIES_URL = 'https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline#30';
  const EMAIL = 'closertwoasc@gmail.com';
  const PASSWORD = 'Closer2two!';
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--disable-web-security',
    ],
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  await page.goto(LOGIN_PODIO);
  await page.waitForSelector('#email');
  await page.click('#email');
  await page.type('#email', EMAIL, {delay: 25});
  await page.type('#password', PASSWORD, {delay: 25});
  await page.keyboard.press('Enter');
  await page.waitForSelector('#status_value');

  await page.goto(PROPERTIES_URL);
  await page.waitForSelector('.content');
  await page.click('.content tr:first-child');
  await page.waitForSelector('#property-name');

  let data = await page.evaluate( () => {
    return {
      propertyName: document.querySelector('#property-name > div.frame-wrapper > div.frame-content > div > div > div > p').innerText,
      firstName: document.querySelector('#seller-first-name > div.frame-wrapper > div.frame-content > div > p').innerText,
      lastName: document.querySelector('#seller-last-name > div.frame-wrapper > div.frame-content > div > p').innerText,
      phone: document.querySelector('#seller-phone > div.frame-wrapper > div.frame-content > div > section > div > div.phone-field-component__view-mode__column.phone-field-component__view-mode__values > div').innerText
    }
  })

  // nextPropertie()
  //validación
  // guardar variables en json
/*
  await page.waitForNavigation( 3000 );
  if (await page.$('#seller-last-name') !== null) {
      await page.click('#buttonToClick');
    } else {
     // await page.waitForSelector('#otherButton');
      await page.click('body > div.content-overlay.items-section.background-animate.is-animated.background > div > div.item-overlay.item-overlay--animate.js-overlay-content-area > div > div > div > div');
    }

  */

  let message = `Hello ${data.firstName}, I'm trying to reach out because I have an offer here for your property at ${data.propertyName} , and I was wondering what is the best time to call? Thanks! 🙏`;

  //debugger;

  await page.goto(LOGIN_SMRTPHONE);
  await page.waitForSelector('#username');
  await page.type('#username', EMAIL, {delay: 25});
  await page.type('#password', PASSWORD, {delay: 25});
  await page.click('body > div.page-container.login-container > div > div > div > div.panel.panel-body.login-form > form > div:nth-child(5) > button');

  await page.waitForSelector('#dialer > div.dialerOpenContainer > a > svg > g > g > g > rect:nth-child(4)');
  await page.waitForTimeout(13000);
  await page.waitForSelector('#dialer > div.dialerOpenContainer > a > svg > g > g > g > rect:nth-child(4)');
  await page.click('#dialer > div.dialerOpenContainer > a > svg > g > g > g > rect:nth-child(4)');
  await page.waitForTimeout(3000);
  await page.waitForSelector('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.dialerRender > div.dialerScreen > div > div.makeCallInputContainer > div > div > input');
  await page.click('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.dialerRender > div.dialerScreen > div > div.makeCallBtnGroup > div > button.ui.blue.icon.right.labeled.button.buttonMessage');
  await page.waitForTimeout(3000);
  await page.waitForSelector('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div.ui.category.fluid.search.makeACallTypeahead > div > input');
  await page.type('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div.ui.category.fluid.search.makeACallTypeahead > div > input', data.phone, {delay: 25});
  await page.waitForTimeout(3000);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  await page.type('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > textarea', message, {delay: 25});
  
  //await page.waitForSelector('');


  //await browser.close();
  debugger;
})();