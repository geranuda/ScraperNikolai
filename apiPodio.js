//client id : stallion-engine-v8-automatization
//client secret: uI2YKmUwKVW7gwslrjiOuiBRAhqTjwOrUM8Cy7EBRscZIrm03vywG3h6pMLa7sMa
// Example config file where you might store your credentials

const podioApi = require("./modules/podioApi");



// π Authenticate with using request and pass the config as form-encoded to get access_token
(async function(){

    let access_token = await podioApi.init();
    console.log("π€ΈββοΈπ€ΈββοΈπ€ΈββοΈπ€ΈββοΈπ€ΈββοΈ",access_token);


    // π Use request to make api request to get items data
    let responseData = await podioApi.getData("https://api.podio.com/item/app/25804586/filter/49714622", access_token);
    // let responseData = await podioApi.getData("https://api.podio.com/view/app/25804586/49714622", access_token);

    console.log("Received data from podio API",responseData);
})()


// π return the data for processing


// π Setup a local database and save the data from index.js 
// π 