const covid19Stats = require("../index")
const countries = require("./countries.json")

// getStats
covid19Stats.getStats()
    .then(stats => {
        console.log("Checking getStats...")
        // Check if every country is in the scraped data.
        let everyCountry = 
            countries.every(country => {
                if (stats.some(entry => entry.country == country)) return true
                else {
                    console.error(country + " missing!")
                    return false
                }
            })
        
            if (!everyCountry) {
                throw "There are missing countries! Check the log."
            } else console.log("getStats passed!")
    }).catch(error => {
        console.log("getStats failed!")
        console.error(error)
        throw error
    });

// getCountry