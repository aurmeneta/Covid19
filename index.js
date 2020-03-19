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


const siteUrl = "https://www.worldometers.info/coronavirus/#countries";
const charsToRemove = /[,+]/g;

const axios = require('axios');
const cheerio = require('cheerio');

export function getStats() { 	
	return axios.get(siteUrl).then(response => {
		let data = []; // Initialize an empty array to save the information to be retrieved.

		const $ = cheerio.load(response.data); // Load the webpage.
		const table = $('#main_table_countries_today'); // Look for the table.
		const tbodies = table.find('tbody'); // Look for the 'tbody' tags in the table.

		// Data in the table is divided in two 'tbody' tags. The first one contains the information for each country and the second one the totals.
		const tbody_countries = tbodies[0]; // Countries tbody.
		const tbody_total = tbodies[1]; // Total tbody.

		const table_rows_countries = $(tbody_countries).find('tr').toArray();
		const table_rows_total = $(tbody_total).find('tr');

		// Get the totals.
		const total_columns = $(table_rows_total[0]).find('td');
		let country = 'Total';
		let totalCases = parseInt($(total_columns[1]).text().replace(charsToRemove,'')) || 0;
		let newCases = parseInt($(total_columns[2]).text().replace(charsToRemove,'')) || 0;
		let totalDeaths = parseInt($(total_columns[3]).text().replace(charsToRemove,'')) || 0;
		let newDeaths = parseInt($(total_columns[4]).text().replace(charsToRemove,'')) || 0;
		let totalRecovered = parseInt($(total_columns[5]).text().replace(charsToRemove,'')) || 0;
		let activeCases = parseInt($(total_columns[6]).text().replace(charsToRemove,'')) || 0;
		let criticalCases = parseInt($(total_columns[7]).text().replace(charsToRemove,'')) || 0;
		let ratio = parseFloat($(total_columns[8]).text().replace(charsToRemove,'')) || 0;
		
		// Add the date to the array.
		data.push({country, totalCases, newCases, totalDeaths, newDeaths, totalRecovered, activeCases, criticalCases, ratio});

		// Get the data by country.
		table_rows_countries.forEach(row => {
			const columns = $(row).find('td');
			country = $(columns[0]).text().trim();
			totalCases = parseInt($(columns[1]).text().replace(charsToRemove,'')) || 0;
			newCases = parseInt($(columns[2]).text().replace(charsToRemove,'')) || 0;
			totalDeaths = parseInt($(columns[3]).text().replace(charsToRemove,'')) || 0;
			newDeaths = parseInt($(columns[4]).text().replace(charsToRemove,'')) || 0;
			totalRecovered = parseInt($(columns[5]).text().replace(charsToRemove,'')) || 0;
			activeCases = parseInt($(columns[6]).text().replace(charsToRemove,'')) || 0;
			criticalCases = parseInt($(columns[7]).text().replace(charsToRemove,'')) || 0;
			ratio = parseFloat($(columns[8]).text().replace(charsToRemove,'')) || 0;

			// Add the data to the array.
			data.push({country, totalCases, newCases, totalDeaths, newDeaths, totalRecovered, activeCases, criticalCases, ratio});
		});

		// Return the array.
		return data;
	}); 	
}