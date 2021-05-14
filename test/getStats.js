const covid19Stats = require("../index")
const countries = require("./countries.json")



exports.testGetStats =  async () => {
    console.log("Checking getStats...")
    let stats = await covid19Stats.getStats()
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
            throw "There are missing countries! Check log."
        }
}