
const podio = require('./podio');
const generateAgreement = require("./modules/generateAgreement");
const {getStateFromAddress, getStateFromGeoApify} = require('./modules/getStateFromAddress');
const todayDate = require('./modules/todayDate');
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
      // ✅scrape data 
      let agreementData = await page.evaluate(()=>{
            return {
                  firstName: document.querySelector("#seller-first-name .view-mode") !== null ? document.querySelector("#seller-first-name .view-mode").textContent.trim(): "",
                  lastName: document.querySelector("#seller-last-name .view-mode") !== null ? document.querySelector("#seller-last-name .view-mode").textContent.trim() : "",
                  streetAddress: document.querySelector("#property-name .frame-content") !== null ? document.querySelector("#property-name .frame-content").innerText.replace(" (Multifamily)", "") : "",
                  propertyPrice: document.querySelector("#verbal-offer-amount input.amount-input") !== null ? document.querySelector("#verbal-offer-amount input.amount-input").value : "",
                  escrowMoney: document.querySelector("#verbal-offer-amount input.amount-input") !== null ? (Number(document.querySelector("#verbal-offer-amount input.amount-input").value)*.005) : "",
                  state: "",
                  date: "", //"MM/DD/YYYY" //DAte of creation
                  
            }
      })

      console.log("AgreementData from the property page is", agreementData)
      console.log("Adding today's date to the data", todayDate())
      agreementData.date = todayDate();

      console.log("Adding state to the data")
      try {
            agreementData.state = await getStateFromAddress(agreementData.streetAddress);
        } catch (error) {
            agreementData.state = await getStateFromGeoApify(agreementData.streetAddress)
        }
        console.log("Added state to the data");


      agreementData.sellerName = agreementData.firstName + " " + agreementData.lastName;
      console.log("🎁🎁🎁🎁 data for Agreement is: ", agreementData)
      //🔲 create the agreement doc with the extracted data
      let agreementDocPath = await generateAgreement(agreementData);
      console.log("Agreement created at", agreementDocPath)
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