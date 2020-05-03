const request = require('request');
const geocode = (locationQuery = '', callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationQuery)}.json?access_token=pk.eyJ1IjoiaXRzcjFwIiwiYSI6ImNrOWNmYTh2YzAyMTIzbGsyY3BwZjBqcW4ifQ.emobdpkeLP2s56V8eGpfIA`;
    request({
        url,
        json: true
    }, (error, {body: data}) => {
        const {message} = data;
        if (error){
            callback(error, undefined);
        }else if (message){
            callback(message, undefined);
        }else if (data.features.length === 0){
            callback('Address not found', undefined);
        }else{
            
            callback(undefined, {
                longitude: data.features[0].center[0],
                latitude: data.features[0].center[1],
                place: data.features[0].place_name
            });
        }
    });
};

module.exports = geocode;