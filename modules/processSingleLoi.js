const generateLoiDoc = require("./generateLoiDoc")
const { getStateFromAddress, getStateFromGeoApify } = require("./getStateFromAddress")
const moment = require("moment");

/**
 * @param {puppeteer page} page 
 * @param {url of the lead from which data has to be scraped(optional if executing it the lead page)} leadUrl 
 * ✅ Scrapes data from the lead
 * ✅ generates the worddoc 
 * 🔲 Submits the worddoc do the lead (WIP) (❌❌❌❌STUCK)
 */
const processSingleLoi = async (page, leadUrl)=>{
    if(leadUrl !== undefined){
        await page.goto(leadUrl)
        await page.waitForSelector("#seller-first-name")
        await page.waitFor(1000)
    }
    // ✅scrape data 
    let leadData = await page.evaluate(()=>{
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
                date: "", //"MM/DD/YYYY" //Date of creation
                
        }
    })

    console.log("leadData from the property page is", leadData)
    console.log("Adding today's date to the data", moment().format("MM/DD/YYYY"))
    leadData.date = moment().format("MM/DD/YYYY")

    // Offer validity date
    leadData.validityDate = moment().add(7,"days").format("MM/DD/YYYY")

    console.log("Adding state to the data")
    try {
        leadData.state = await getStateFromAddress(leadData.propertyAddress);
    } catch (error) {
        leadData.state = await getStateFromGeoApify(leadData.propertyAddress)
    }
    console.log("Added state to the data");


    leadData.sellerName = leadData.firstName + " " + leadData.lastName;
    console.log("🎁🎁🎁🎁 data for lead is: ", leadData)
    //✅ create the lead doc with the extracted data
    let leadDocPath = await generateLoiDoc(leadData);
    console.log("lead created at", leadDocPath)
}

module.exports = processSingleLoi;