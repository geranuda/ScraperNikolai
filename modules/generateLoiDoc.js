
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
const generateLoiDoc = async function(agreementData){
    const content = fs.readFileSync(
        path.resolve(__dirname, "../templateDocs/LOI.docx"),
        "binary"
    );
    
    const zip = new PizZip(content);
    
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    
    doc.render(agreementData);
    
    const buf = doc.getZip().generate({ type: "nodebuffer" });
    let outputFilePath = path.resolve(__dirname, "../outputDocs/LOI "+convertToValidFilename(agreementData.sellerName)+".docx");
    fs.writeFileSync(outputFilePath, buf);

    return outputFilePath
}

module.exports = generateLoiDoc;