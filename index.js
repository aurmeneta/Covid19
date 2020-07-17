/*
Copyright (c) 2020, Andrés Urmeneta B. <aurmenetab@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE. 
*/


const siteUrl = "https://www.worldometers.info/coronavirus";
const charsToRemove = /[,+]/g;

const axios = require('axios');
const cheerio = require('cheerio');


/**
 * Scrapes the worldometers website for the statistical information. 
 * Gets the webpage and then converts the html table in an array of objects. 
 * Returns a promise, which returns an array containing the entries of the table.
 */
exports.getStats = () => axios.get(siteUrl).then(response => {
	let data = []; // Initialize an empty array to save the information to be retrieved.

	const $ = cheerio.load(response.data); // Load the webpage.
	const table = $('#main_table_countries_today'); // Look for the table.
	const tbodies = table.find('tbody'); // Look for tbody tags inside the table tag.

	// The table has several tbody tags. The first one contains the information for every country/territory.
	const tbody_countries = tbodies[0]; // Countries tbody.

	// Get every row of the table.
	const table_rows_countries = $(tbody_countries).find('tr').toArray();

	// Get the data for each country.
	table_rows_countries.forEach(row => {
		// Get every column of the row.
		const columns = $(row).find('td');

		country = $(columns[1]).text().trim().toUpperCase();
		totalCases = parseInt($(columns[2]).text().replace(charsToRemove,'')) || 0;
		newCases = parseInt($(columns[3]).text().replace(charsToRemove,'')) || 0;
		totalDeaths = parseInt($(columns[4]).text().replace(charsToRemove,'')) || 0;
		newDeaths = parseInt($(columns[5]).text().replace(charsToRemove,'')) || 0;

		// Add the data to the array.
		data.push({country, totalCases, newCases, totalDeaths, newDeaths});
	});

	// Return the array.
	return data;
});


/**
 * Gets a the data of a specific country by searching it in the array returned from getStats(). 
 * Returns a promise, which returns the desired information as an object.
 */
exports.getCountry = (country) => {
	return this.getStats().then(stats => {
		return stats.find(entry => entry.country == country.toUpperCase());
	});
}