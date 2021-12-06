const sendMessage = async (data, page, login)=>{
  await page.setDefaultNavigationTimeout(0);
  const LOGIN_SMRTPHONE = 'https://phone.smrt.studio/login';
  const EMAIL = 'closertwoasc@gmail.com';
  const PASSWORD = 'Closer2two!';
  let message = `Hello ${data.firstName}, I'm trying to reach out because I have an offer here for your property at ${data.propertyName} , and I was wondering what is the best time to call? Thanks! 🙏`;
  
  if(login){
      console.log("Logging in now")
      await page.goto(LOGIN_SMRTPHONE, {timeout: 0});
      await page.waitForSelector('#username');
      await page.type('#username', EMAIL, {delay: 25});
      await page.type('#password', PASSWORD, {delay: 25});
      await page.click('body > div.page-container.login-container > div > div > div > div.panel.panel-body.login-form > form > div:nth-child(5) > button');
  }else{
      console.log("Seems already logged in")
  }

  console.log("Waiting for dialer")
   await page.waitForSelector('#dialer > div.dialerOpenContainer > a > svg > g > g > g > rect:nth-child(4)', {timeout: 0});
   await page.waitForTimeout(13000);
   console.log("Waited for dialer")
   await page.waitForSelector('#dialer > div.dialerOpenContainer > a > svg > g > g > g > rect:nth-child(4)', {timeout: 0});
    // click message button
   await page.click('#dialer > div.dialerOpenContainer > a > svg > g > g > g > rect:nth-child(4)');
   await page.waitForTimeout(3000);
   console.log("🌹🌹🌹Here")
   await page.waitForSelector('.svgDialerOpen', {timeout: 0});
   await page.click('.svgDialerOpen');
   console.log("🎁😊🎁 Typing phone number")
   await page.waitForTimeout(3000);
   // hi, no mic, i am nicolas did before code, i checkout, good job, are you there?
   // Hello I am Juni
   // i checkout no xd, i was loocking i mean to say, you still work?
   // Yes I need to fix the message part. the click on the call/message icons does not always open the same popup
   //so can't rely on that
   // i think the selector is not the correct
   // Not sure but I prefer the other way. I'l;l implement now
   // perfect, let me observe
   try{
    await page.click("#dialer > div.dialerWrapper.openedDialer.darkTheme > div.dialerRender > div.dialerScreen > div > div.makeCallBtnGroup > div > button.ui.blue.icon.right.labeled.button.buttonMessage")
    await page.waitForSelector('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div.ui.category.fluid.search.makeACallTypeahead > div > input', {timeout: 0});
    console.log("🎁🎁😢 TYping message")
    await page.type('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div.ui.category.fluid.search.makeACallTypeahead > div > input', data.phoneNumber , {delay: 25});
    console.log("😎🎁🎁Pressing arrow down")
    await page.waitForTimeout(3000);
    await page.keyboard.press('ArrowDown');
    console.log("🎶🎁🎁Sending message")
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    await page.type('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > textarea', message, {delay: 25});
   
   }catch(e){
    await page.click("#dialer > div.dialerWrapper.openedDialer.darkTheme > div.dialerRender > div.ui.basic.inverted.buttons.actionBar > button:nth-child(1)")
    console.log("Clicked the diler again")

    await page.click("#dialer > div.dialerWrapper.openedDialer.darkTheme > div.dialerRender > div.dialerScreen > div > div.makeCallBtnGroup > div > button.ui.blue.icon.right.labeled.button.buttonMessage")
    await page.waitForSelector('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div.ui.category.fluid.search.makeACallTypeahead > div > input', {timeout: 0});
    console.log("🎁🎁😢 TYping message")
    await page.type('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div.ui.category.fluid.search.makeACallTypeahead > div > input', data.phoneNumber , {delay: 25});
    console.log("😎🎁🎁Pressing arrow down")
    await page.waitForTimeout(3000);
    await page.keyboard.press('ArrowDown');
    console.log("🎶🎁🎁Sending message")
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    await page.type('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > textarea', message, {delay: 25});
    await page.keyboard.press("Enter");
    await page.click("#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div:nth-child(5) > button")
    console.log("Message sent!")
   }
}


module.exports = sendMessage;