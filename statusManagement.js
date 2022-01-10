/**
 * Remove lines 15 - 31 and do await page.goto("urlWhereTheLeadsAre");
 * ["Offer Accepted", "New"] -> first index to second index line 43
 */ 
const processSingleLoi = require('./modules/processSingleLoi');
const podio = require('./podio');

const EMAIL = 'closertwoasc@gmail.com';
const PASSWORD = 'Closer2two!';

(async () => {
const page = await podio.initialize()
await podio.login(EMAIL, PASSWORD, page) 
//wait for "Offer Accepted / Sent Contract" and then click on Gerry under it
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
