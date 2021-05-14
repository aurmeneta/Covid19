const covid19Stats = require("../index")
const countries = require("./countries.json")

const testFailed = "getStats failed! Check log."

exports.testGetCountry = async () => {
    console.log("Checking getCountry...")
    countries_count = countries.length;
    i = 0;
    for (const country of countries) {
        console.log(`${i + 1} of ${countries_count}`)
        country_stats = await covid19Stats.getCountry(country)

        // Check if something is returned.
        if (!country_stats) {
            console.log(country + " returned nothing!")
            throw testFailed
        }

        // All countries have at least one case, check if this is true.
        if (country_stats.totalCases < 1) {
            console.log(country + "has incoherent data!")
            throw testFailed
        }

        // Check if the returned object has the correct types.
        let {country: c, totalCases, newCases, totalDeaths, newDeaths} = country_stats 
        if ((typeof c != "string") && (typeof totalCases != "number") &&
            (typeof newCases != "number") && (typeof totalDeaths != "number") &&
            (typeof newDeaths != "number")) {
                console.log(country + " has incorrect types")
                throw testFailed
            }

        i += 1
    }
}