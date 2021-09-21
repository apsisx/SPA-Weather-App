var express = require('express');
var router = express.Router();
var fs = require('fs');

// This will creates new Object.keys for array. The key will be a value with this function.
var isCombineFuncOfCity = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

/* Create an API via reading "./assets/fake-weathers.json". */
router.get('/weathers', (req, res, next) => {

    // When typing a search parameter, default value will be used as isSearchQuery
    const isSearchQuery = req.query.isSearchQuery
    // Read JSON File
    fs.readFile('./assets/fake-weathers.json', (err, isJSONData) => {
        try {
            const isParsedJSONData = JSON.parse(isJSONData)
            // Change unix timestamp to HH:MM:SS format
            for (isSingleData in isParsedJSONData) {
                // Default variable of dt = unix timestamp
                let isTimeStamp = isParsedJSONData[isSingleData].dt
                // Create default time format like HH:MM:SS
                isParsedJSONData[isSingleData].dt = new Date(isTimeStamp).toLocaleTimeString("en-US").replace(' PM', '')
            }
            // Create live search function
                // Set value as case insensitive 
                var isInsensitiveSearch = new RegExp(isSearchQuery, 'gi')
                // Filter with search parameter
                var isFilteredJSONData = isParsedJSONData.filter(isCity => isCity.city.match(isInsensitiveSearch))
                // Send json data with newly created object
                res.json(isCombineFuncOfCity(isFilteredJSONData, 'city'))
        } catch (error) {
            console.log(error)
        }
    })
})

module.exports = router;