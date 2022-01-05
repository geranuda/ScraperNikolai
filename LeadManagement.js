
const podio = require('./podio');
const generateAgreement = require("./modules/generateAgreement");
const {getStateFromAddress, getStateFromGeoApify} = require('./modules/getStateFromAddress');
const todayDate = require('./modules/todayDate');
const processSingleAgreement = require('./modules/processSingleAgreement');
const EMAIL = 'closertwoasc@gmail.com';
const PASSWORD = 'Closer2two!';

(async () => {
const page = await podio.initialize()
await podio.login(EMAIL, PASSWORD, page) 
// wait for "Offer Accepted / Sent Contract" and then click on Gerry under it
await page.waitForSelector('.app-sidebar__content');
await page.waitFor(1000)
await page.evaluate(()=>{
      let scrollInterval = setInterval(() => {
            document.querySelector(".app-sidebar__content").scrollTop = document.querySelector(".app-sidebar__content").scrollHeight
            if (document.querySelector('[data-id="49744698"] ul li:nth-child(2)') !== null) {
                  clearInterval(scrollInterval)
                  console.log("FOund selector");
                  document.querySelector('[data-id="49744698"] ul li:nth-child(2)').scrollIntoView()
            }
      }, 100)
})

await page.waitFor(2000)
await page.click('[data-id="49744698"] ul li:nth-child(2)');
await page.waitFor(2000)

await page.waitForSelector(".content", {timeout: 0})

await page.click('.content tr');
console.log("Clicked on tr item");

do{
      await page.waitForSelector("#seller-first-name")
      await page.waitFor(1000)

     // await processSingleAgreement(page)

      await podio.changeStatus(page, ["Offer Accepted", "New"])
      
      await page.waitFor(3000)

      try {
            await page.click(".arrow-right");
      } catch (error) {
            console.log("Next arrow not found", error.message)
            break;
      }
      
}while(await page.evaluate(()=> document.querySelectorAll(".arrow-right").length))

console.log("Broke out of the loop");

//await podio.changeStatus()
})()

/*
1. Wait for Selector of Properties-pipeline
2. Click the first row
3.Get FirstName Last Name, Propperty Address, State, Accepted Amount, Date(LOI Date + 7 days) (Agreement date of creation)
      Earnest Money .5% of Accepted Amount
      if accepted 200,000 then Earnest Money = 1000     USD
*For testing Offer Accepted/ Sent Contract 

4. Create PDF 
5. Upload to podio
*/