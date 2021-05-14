const { testGetStats } = require("./getStats")
const { testGetCountry } = require("./getCountry")

// getStats
testGetStats()
    .then( () => {
        console.log("getStats passed!")
        return testGetCountry()
    }).catch(e => {
        console.log(e)
        console.log("Test failed!")
        process.exit(1)
    })

/*
// getCountry
(async () => {
    console.log("Checking getCountry...")
    for (country in countries) {
        let stats = await covid19Stats.getCountry(country);
        if (!stats) {
            console.error(country + "missing!")
            throw "There are missing countries! Check log."
        }
    }
})()*/