export async function fetchWeatherData(place) {
  try {  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place.trim()}?unitGroup=us&key=WTSH696YPX9AUC932CHFR8EHC&contentType=json`, {
  "method": "GET",
  "headers": {
  }
  });

if (!response.ok) {
    throw new Error(`HTTP Error: status: ${response.status}`)
}
  return await response.json();
}

catch (err) {
  console.error(err);
  throw err;
};
}
