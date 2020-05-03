const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=e5026c444e73ab34241c108e48616e7a`;
    request({ 
        url, json: true 
    }, (error, {body: data}) => {
        const {message} = data;
        if (error){
            callback(error.Error, undefined);   
        }else if(message){
            callback(message, undefined);
        }else{
            nextHourForecast = data.hourly[0];
            callback(undefined, nextHourForecast);
        }
    });
};

module.exports = forecast;