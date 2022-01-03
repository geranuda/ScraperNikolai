const podio = require('./podio');
const EMAIL = 'closertwoasc@gmail.com';
const PASSWORD = 'Closer2two!';

(async () => {
const page = await podio.initialize()
await podio.login(EMAIL, PASSWORD, page) 
await page.waitForSelector('[data-reactid=".1.1.4.1:$view-49744698.1.0.$1"]');
await page.waitFor(1000)
await page.click('[data-reactid=".1.1.4.1:$view-49744698.1.0.$1"]');

await page.waitFor(2000)
await page.waitForSelector(".content", {timeout: 0})

await page.click('.content tr');


do{
      await page.waitForSelector("#seller-first-name")
      await page.waitFor(1000)
      // ✅scrape data 
      let agreementData = await page.evaluate(()=>{
            return {
                  firstName: document.querySelector("#seller-first-name .view-mode").textContent.trim(),
                  lastName: document.querySelector("#seller-last-name .view-mode").textContent.trim(),
            }
      })
      console.log("🎁🎁🎁🎁 data for Agreement is: ", agreementData)
      //🔲 create the agreement doc with the extracted data

      //🔲 upload the generated agreement doc 
      
      await page.waitFor(3000)
      //await page.waitForSelector(".arrow-right");
      // click the next arrow if it is not null
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