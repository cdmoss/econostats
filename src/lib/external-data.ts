export async function fetchGDP(countryCode: string, perPage = 50, page = 1) {
    const response = await fetch(`http://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json&per_page=${perPage}&page=${page}`);
    const data = await response.json();
    return data;
  }