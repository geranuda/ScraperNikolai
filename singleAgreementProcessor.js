
const podio = require('./podio');

const processSingleAgreement = require('./modules/processSingleAgreement');
const EMAIL = 'closertwoasc@gmail.co';
const PASSWORD = 'Closer2two!';

(async () => {
      let leadUrls = ["https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/2395", "https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/1266","https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/1268", "https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/3723", "https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/1705","https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/2895", "https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/208", "https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/771","https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/3078","https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/3709","https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/1304","https://podio.com/ascguscom/development-deals-pipeline/apps/properties-pipeline/items/2692"]
      
      const page = await podio.initialize()
      await podio.login(EMAIL, PASSWORD, page)
      await processSingleAgreement(page, leadUrls[0])
      //await podio.changeStatus(page, ["Offer Accepted", "New"])
})()