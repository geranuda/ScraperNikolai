const NLP = require("../modules/NLP");
(async()=>{
    
let nlp = await NLP.init();
let response = await NLP.getRawReply("1b, 3b", nlp);

console.log(response.nluAnswer);
})()