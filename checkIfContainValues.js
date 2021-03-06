const podio = require('./podio');

const EMAIL = 'closertwoasc@gmail.com';
const PASSWORD = 'Closer2two!';

(async () => {
const page = await podio.initialize()
await podio.login(EMAIL, PASSWORD, page) 
await page.waitForSelector(".content", {timeout: 0})

await page.click('.content tr');

console.log("Clicked on tr item");

do{
      await page.waitForSelector("#seller-first-name")
      await page.waitFor(2000)
      console.log("πππFIrst name ready");
      let amountNotAvailable = await page.evaluate(()=>{
        
            let vamountSelector = document.querySelector('#verbal-offer-amount')
            return vamountSelector.querySelector(".amount-input") == null
    })
    console.log("πππamount available", amountNotAvailable);
     if(amountNotAvailable){
         // change status from "12 month drips" to "for evaluation"
         await podio.changeStatus(page, ["In 12 months Drip", "For Evaluation"])
         // change evaluator to josh
         await page.click('#evaluator [data-id="2"]');
         await page.waitFor(4000)
     }
     console.log("ππππππ")
      await page.waitFor(4000)

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

