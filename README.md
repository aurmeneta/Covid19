# Covid19
NPM Package to retrieve worldometers' live statistics of the Covid-19 pandemic. Scraper of [worldometers](https://www.worldometers.info).

# Disclaimer
This packages uses web scraping to retrieve the statistical information. This could potentially mean a copyright infringement and be criminally prosecuted. The scraped information belongs to Worldometers and its sources. Use at your own risk.

# Usage
Just import the module and run `getStats()`.

```javascript
const covid19 = requiere('covid19-stats');

let stats = await covid19.getStats();
```

`getStats` returns an array containing the stats by country. The countries are named as listed in worldometers. 

```javascript
[
  {
    country: 'WORLD',
    totalCases: 218420,
    newCases: 20189,
    totalDeaths: 8938,
    newDeaths: 960,
  },
  {
    country: 'USA',
    totalCases: 3695025,
    ...
  },
  ...
]
```

You can also get the data of a specific country.

```javascript
let usa = await covid19.getCountry('usa');
```

`getStats` returns an object containing the information of the desired country. The countries are named as listed in worldometers.

```javascript
{
  country: 'USA',
  totalCases: 3695025,
  ...
}