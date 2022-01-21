var request = require('request');

const podioApi = {
    access_token: "",
    init: async function(){
        return new Promise((resolve, reject)=>{
            let options = {
                    'method': 'POST',
                    'url': 'https://api.podio.com/oauth/token',
                    'headers': {
                    },
                    formData: {
                        'grant_type': 'app',
                        'client_id': 'stallion-engine-v8-automatization',
                        'client_secret': 'uI2YKmUwKVW7gwslrjiOuiBRAhqTjwOrUM8Cy7EBRscZIrm03vywG3h6pMLa7sMa',
                        'app_id': '25804586',
                        'app_token': 'a9c9aca5470b84d943f7a9b2f1bafd26'
                    }
                };
                request(options, function (error, response) {
                    if (error) throw new Error(error);
                    // console.log("🔥🔥 Resolving promise with", JSON.parse(response.body).access_token);
                    resolve(JSON.parse(response.body).access_token);
                });
        })
    },
    getData: async (url, access_token)=>{
        return new Promise((resolve, reject)=>{
            var options = {
                'method': 'POST',
                'url': url,
                'headers': {
                    'Authorization': 'Bearer ' + access_token,
                },
                body: JSON.stringify({
                    "limit": 2,
                    "offset": 0
                })
            };
            request(options, function (error, response) {
            if (error) throw new Error(error);
                resolve(JSON.parse(response.body));
            });
        });
    }
}
module.exports = podioApi;