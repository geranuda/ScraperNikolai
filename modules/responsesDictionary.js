module.exports = [
    {
        messages: ["Sure", "yes send me the offer", "now", "Ok", "yes","Send it",], //POSITIVE 😊 
        reply: "Ok, I'll call you with the offer. What is the best time?"
    },
    {
        messages: ["Stop", "Sold", "No", "Fuck", "It is not me",], //negative 😢 
        reply: "Ok, thank you and have a blessed day "
    },
    {
        messages: ["Who is this?", "How can I help?", "Who are you"], //Neutral 😎
        reply: `This is Gerry here with All States Equity Group, I believe that you spoke with one of my associates about your propperty at ${data.propertyName}`
    },
    /*
    Template for adding more messages
    {
      messages: [], //special cases
      reply: ""  
    },
    */
];