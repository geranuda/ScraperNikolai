var addresser = require('addresser');
const fetch = require('node-fetch');

const getStateFromAddress = async function(address){
    return new Promise(async (resolve, reject)=>{
        try {
            let formattedAddress = await addresser.parseAddress(address)
            //console.log("Address taken from npm module", formattedAddress)
            resolve(formattedAddress.stateName);
            
        } catch (error) {
            //console.log("Error happened", error.message)
            reject("Error")
        }
    })
}
const getStateFromGeoApify = async function(address){
    return new Promise(async (resolve, reject)=>{
        let result = await fetch("https://api.geoapify.com/v1/geocode/autocomplete?text="+address+"&format=json&apiKey=8bfce779882d41398447e4d1eb5fde54", {method: 'GET'}).then(response => response.json())
        if(result.results && result.results.length > 0){
            //console.log("Result from GEOAPIFY", result.results[0])
            resolve(result.results[0].state);
        }else{
            console.log("❌❌Result is ", result)
            if(result.query.parsed.state !== undefined){
                resolve(result.query.parsed.state)
            }
        }
    })
}

module.exports = {getStateFromAddress, getStateFromGeoApify};