module.exports = 
 [
        {
            messages: ["Sure", "yes send me the offer", "now", "Ok", "yes","Send it","You can make an offer anytime",], //POSITIVE 😊 
            reply: "Ok, I'll call you with the offer. What is the best time?"
        },
        {
            messages: ["Stop", "Sold", "No", "Fuck", "It is not me","Thanks Gerry and same to you! I have sold that property and will close on January 5th.",], //negative 😢 
            reply: "Ok, thank you and have a blessed day "
        },
        {
            messages: ["Who is this?", "How can I help?", "Who are you"], //Neutral 😎
            reply: `This is Gerry here with All States Equity Group, I believe that you spoke with one of my associates about your propperty`
        },
        /*
        Template for adding more messages
        {
          messages: [], //special cases
          reply: ""  
        },
        */
    ];