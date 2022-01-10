const { dockStart } = require('@nlpjs/basic');


    const NLP = {
        init : async function(){
            const dock = await dockStart({ use: ['Basic']});
            const nlp = dock.get('nlp');
            nlp.addLanguage('en');
            // Adds the utterances and intents for the NLP
            // 🙂Positive
            let positive = ["Sure", "yes send me the offer", "now", "Ok", "yes","Send it","You can make an offer anytime",];
            for(let response of positive){
                nlp.addDocument('en', response, 'response.positive');
            }
            
            //negative 😢 
            let negative = ["Stop", "Sold", "No", "Fuck", "It is not me","It already sold",];
            for(let response of negative){
                nlp.addDocument('en', response, 'response.negative');
            }

            //Neutral 😎
            let neutral = ["Who is this?", "How can I help?", "Who are you"];
            for(let response of neutral){
                nlp.addDocument('en', response, 'response.neutral');
            }

            // Train also the NLG
            nlp.addAnswer('en', 'response.positive', "Ok, I'll call you with the offer. What is the best time?");
            nlp.addAnswer('en', 'response.negative', 'Ok, thank you and have a blessed day');
            nlp.addAnswer('en', 'response.neutral', 'This is Gerry here with All States Equity Group, I believe that you spoke with one of my associates about your propperty');  
            await nlp.train();
            return nlp;
        },
        getReplyMsg: async function(userMessage, nlp){
            
            const response = await nlp.process('en', userMessage);
            return response.answer;
        },

    }

module.exports = NLP;