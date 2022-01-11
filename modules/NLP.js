const { dockStart } = require('@nlpjs/basic');


    const NLP = {
        init : async function(){
            const dock = await dockStart({ use: ['Basic']});
            const nlp = dock.get('nlp');
            nlp.addLanguage('en');
            // Adds the utterances and intents for the NLP
            // 🙂Positive
            let positive = ["Sure", "yes send me the offer", "now", "Ok", "yes","Send it","You can make an offer anytime", "text", "You can text it", "email", "send it to my email","I'm still interested", "interested",
                                "messaging", "you can message me", "call anytime"];
            for(let response of positive){
                nlp.addDocument('en', response, 'response.positive');
            }
            
            //negative 😢 
            let negative = ["Stop", "Sold", "No", "Fuck", "It is not me","It already sold","Not interested", "Already under contract",];
            for(let response of negative){
                nlp.addDocument('en', response, 'response.negative');
            }

            //Neutral 😎
            let neutral = ["Who is this?", "How can I help?", "Who are you?", "how did you get my number?"];
            for(let response of neutral){
                nlp.addDocument('en', response, 'response.neutral');
            }

             //Human needed 
            let humanNeeded = ["Ok, my questions is", "I have a question", "I haven't received anything", "I did not get any offer", "I'm selling another property", "I have different properties",];
            for(let response of humanNeeded){
            nlp.addDocument('en', response, 'response.humanNeeded');
            }

            //Human needed 
            let apoinmentNeeded = ["I should be free this afternoon around ", "Call around", "I will be available at ", ];
            for(let response of apoinmentNeeded){
            nlp.addDocument('en', response, 'response.apoinmentNeeded');
            }
            
            // Train also the NLG
            nlp.addAnswer('en', 'response.positive', 'Perfect, let me work on that right away');
            nlp.addAnswer('en', 'response.negative', 'Ok, thank you and have a blessed day');
            nlp.addAnswer('en', 'response.neutral', 'This is Gerry here with All States Equity Group, I believe that you spoke with one of my associates about your propperty');  
            nlp.addAnswer('en', 'response.humanNeeded', 'Let me check that.');
            nlp.addAnswer('en', 'response.apoinmentNeeded', 'Ok, I will call you at that time, thanks!');
            await nlp.train();
            return nlp;
        },
        getReplyMsg: async function(userMessage, nlp){
            
            const response = await nlp.process('en', userMessage);
            return response.answer;
        },

    }

module.exports = NLP;