const generateAgreementDoc = require("./generateAgreementDoc")
const { getStateFromAddress, getStateFromGeoApify } = require("./getStateFromAddress")
const moment = require("moment");

/**
 * 
 * @param {puppeteer page} page 
 * @param {url of the lead from which data has to be scraped(optional if executing it the lead page)} agreementUrl 
 * ✅ Scrapes data from the lead
 * ✅ generates the worddoc 
 * 🔲 Submits the worddoc do the lead (WIP) (❌❌❌❌STUCK)
 */
const processSingleAgreement = async (page, agreementUrl)=>{
    if(agreementUrl.length > 0){
        await page.goto(agreementUrl)
        await page.waitForSelector("#seller-first-name")
        await page.waitFor(1000)
    }
    // ✅scrape data 
    let agreementData = await page.evaluate(()=>{
        const convertToNumber = (num) => {
            return num.replace(/[^0-9\.]+/g, "")
          }
                
        let propertyPrice =document.querySelector("#verbal-offer-amount input.amount-input") !== null ? document.querySelector("#verbal-offer-amount input.amount-input").value : "";
        let escrowMoney = convertToNumber(propertyPrice) * 0.005;
        return {
                firstName: document.querySelector("#seller-first-name .view-mode") !== null ? document.querySelector("#seller-first-name .view-mode").textContent.trim(): "",
                lastName: document.querySelector("#seller-last-name .view-mode") !== null ? document.querySelector("#seller-last-name .view-mode").textContent.trim() : "",
                propertyAddress: document.querySelector("#property-name .frame-content") !== null ? document.querySelector("#property-name .frame-content").innerText.replace(" (Multifamily)", "") : "",
                propertyPrice: propertyPrice,
                escrowMoney: escrowMoney,
                state: "",
                date: "", //"MM/DD/YYYY" //DAte of creation
                
        }
    })

    console.log("AgreementData from the property page is", agreementData)
    console.log("Adding today's date to the data", moment().format("MM/DD/YYYY"))
    agreementData.date = moment().format("MM/DD/YYYY");

    console.log("Adding state to the data")
    try {
        agreementData.state = await getStateFromAddress(agreementData.propertyAddress);
    } catch (error) {
        agreementData.state = await getStateFromGeoApify(agreementData.propertyAddress)
    }
    console.log("Added state to the data");

    agreementData.sellerName = agreementData.firstName + " " + agreementData.lastName;
    console.log("🎁🎁🎁🎁 data for Agreement is: ", agreementData)
    //✅ create the agreement doc with the extracted data
    let agreementDocPath = await generateAgreementDoc(agreementData);
    console.log("Agreement created at", agreementDocPath)
    //🔲 upload the generated agreement doc 
}

module.exports = processSingleAgreement;