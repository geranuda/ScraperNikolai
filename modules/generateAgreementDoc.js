
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
function convertToValidFilename(string) {
    return (string.replace(/[\/|\\:*?"<>]/g, " "));
}
/**
 *  sellerName: "Junaid Anwar",
    propertyAddress: "SOME RANDOM ADDRESS OF THE LOCATION",
    propertyPrice: "$100,000",
    escrowMoney: "{propertyPrice}*.005",
    state: "North Carolina",
    date: "MM/DD/YYYY" //DAte of creation
**/
const generateAgreementDoc = async function(agreementData){
    // Load the docx file as binary content
    const content = fs.readFileSync(
        // path.resolve inside templateDocs/template.docx
        path.resolve(__dirname, "../templateDocs/CASH AGREEMENT.docx"),
        "binary"
    );
    
    const zip = new PizZip(content);
    
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    
    // render the document
    // (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render(agreementData);
    
    const buf = doc.getZip().generate({ type: "nodebuffer" });
    let outputFilePath = path.resolve(__dirname, "../outputDocs/CASH AGREEMENT "+convertToValidFilename(agreementData.sellerName)+".docx");
    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(outputFilePath, buf);

    return outputFilePath
}

module.exports = generateAgreementDoc;