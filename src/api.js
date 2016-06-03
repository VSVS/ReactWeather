var _ = require('lodash');
var rootUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=f5b739190d7e98df72036fc535c2994f";

var kelvinToF = function(kelvin) {
    return Math.round((kelvin - 273.15) * 1.8 + 32) + ' ˚F'
};

module.exports = function(latitude, longitude) {
    var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;

    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            return {
                city: json.name,
                temperature: kelvinToF(json.main.temp),
                description: _.capitalize(json.weather[0].description)
            }
        });
}
