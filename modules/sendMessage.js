const sendMessage = async (data, page, login)=>{
  await page.setDefaultNavigationTimeout(0);
  const LOGIN_SMRTPHONE = 'https://phone.smrt.studio/login';
  const EMAIL = 'closeroneasc@gmail.com';
  const PASSWORD = 'Alan$030' //request password to admin before test;                    if you want to add property addres add please ${data.propertyName}     //
  let message = `Hello! ${data.firstName}, this is Alan here, on behalf of AllStatesEquityGroup.com I just wanted to let you know that on account of our 2022 acquisition guidelines, we would like to make an updated offer for your property at ${data.propertyName}, please let me know if you want me to text/call/email you the offer, Thanks!`;
  
  if(login){
      
      console.log("Logging in now")
      await page.goto(LOGIN_SMRTPHONE, {timeout: 0});
      await page.waitForSelector('#username', {timeout: 0});
      await page.type('#username', EMAIL, {delay: 25});
      await page.type('#password', PASSWORD, {delay: 25});
      await page.click('body > div.page-container.login-container > div > div > div > div.panel.panel-body.login-form > form > div:nth-child(5) > button');
      await page.waitForNavigation();
      console.log("Navigation done")  
  }else{
      console.log("Seems already logged in")
  }

  console.log("Waiting for dialer")
   //await page.waitForSelector('#dialer > div.dialerOpenContainer > a > svg > g > g > g > rect:nth-child(4)', {timeout: 0}); 
   // await page.waitFor(13000);
  //await page.waitFor(9000);
   console.log("Waited for dialer")
   await page.waitForSelector('#dialer > div.dialerOpenContainer > a > svg > g > g > g > rect:nth-child(4)', {timeout: 0});
    // click message button
   await page.click('#dialer > div.dialerOpenContainer > a > svg > g > g > g > rect:nth-child(4)');
  // await page.waitFor(3000);
   await page.waitFor(2000);
   console.log("🌹🌹🌹Here")
   await page.waitForSelector('.svgDialerOpen', {timeout: 0});
   
   console.log("🎁😊🎁 Typing phone number")
   //await page.click('.svgDialerOpen');
   //await page.waitFor(3000);
   await page.waitFor(2000);
  
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
    await page.type('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div.ui.category.fluid.search.makeACallTypeahead > div > input', data.phoneNumberreplace("(Work)", " "), {delay: 25});
    console.log("😎🎁🎁Pressing arrow down")
    //await page.waitFor(3000);
    await page.waitFor(3000);
    //await page.keyboard.press('ArrowDown');
    console.log("🎶🎁🎁Sending message")

   // await page.keyboard.press('Enter');
   await page.click("#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div.ui.category.fluid.search.makeACallTypeahead")
   // await page.waitFor(3000);
   
   await page.waitFor(3000);
   //await page.click('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > textarea')
    await page.type('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > textarea', message);
    await page.click("#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div:nth-child(5) > button")

   }catch(e){
    await page.click("#dialer > div.dialerWrapper.openedDialer.darkTheme > div.dialerRender > div.ui.basic.inverted.buttons.actionBar > button:nth-child(1)")
    console.log("Clicked the diler again")

    await page.click("#dialer > div.dialerWrapper.openedDialer.darkTheme > div.dialerRender > div.dialerScreen > div > div.makeCallBtnGroup > div > button.ui.blue.icon.right.labeled.button.buttonMessage")
    await page.waitForSelector('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div.ui.category.fluid.search.makeACallTypeahead > div > input', {timeout: 0});
   
    console.log("🎁🎁😢 TYping message")
    await page.type('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div.ui.category.fluid.search.makeACallTypeahead > div > input', data.phoneNumber.replace("(Work)", " "), {delay: 10});
    console.log("😎🎁🎁Pressing arrow down")
   // await page.waitFor(3000);
   await page.waitFor(3000);
    //await page.keyboard.press('ArrowDown');
    console.log("🎶🎁🎁Sending message")
   // await page.keyboard.press('Enter');
    // await page.waitFor(3000);
    await page.waitFor(3000);
    await page.type('#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > textarea', message, {delay: 0});
    //await page.keyboard.press("Enter");
    await page.click("#dialer > div.dialerWrapper.openedDialer.darkTheme > div.callScreenContainer.messageContainer > form > div:nth-child(5) > button")
    console.log("Message sent!")
   }
}


module.exports = sendMessage;