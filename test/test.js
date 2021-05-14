const { testGetStats } = require("./getStats")
const { testGetCountry } = require("./getCountry")

// getStats
testGetStats()
    .then( () => {
        console.log("getStats passed!")
        return testGetCountry()
    }).then( () => {
        console.log("getCountry passed!")
    }).catch(e => {
        console.log(e)
        console.log("Test failed!")
        process.exit(1)
    })