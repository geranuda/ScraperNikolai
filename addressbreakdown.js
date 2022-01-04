const {getStateFromAddress, getStateFromGeoApify} = require("./modules/getStateFromAddress");
/*var addresser = require('addresser');

// Isn't confused by duplicate place names
//console.log(addresser.parseAddress("400 South Orange Ave, South Orange , NJ 07079"));
//console.log(addresser.parseAddress("212 West Mill Butler, MO 64730"));
//console.log(addresser.parseAddress("5800 NW 34th St, Oklahoma City, OK"));
console.log(addresser.parseAddress("1706 - 1708 Abbot Kinney Blvd, Venice, CA 90291"));
*/

(async () => {
    
    const addresses = [
        "212 West Mill Butler, MO 64730",
        "5800 NW 34th St, Oklahoma City, OK",
        "5800 nw 34 street Oklahoma City",
        "1706 - 1708 Abbot Kinney Blvd, Venice, CA 90291",
    ]
    for(let address of addresses) {
        try {
            console.log("npm module🎈🎈", await getStateFromAddress(address));
        } catch (error) {
            console.log("GeoApify🎁🎁", await getStateFromGeoApify(address))
        }
    }
    
    
})()