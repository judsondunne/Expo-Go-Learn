const stateAbbreviations = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

async function getAddress(lat, long) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    console.log("Complete address data:", data.address);

    const { house_number, road, town, city, village, state } = data.address;

    // Prefer town over city or village if both are present
    const locality = town || village || city;

    if (!house_number && !road && !locality && !state) {
      throw new Error("Incomplete address data");
    }

    const addressParts = [];

    if (house_number) addressParts.push(`${house_number} `);
    if (road) addressParts.push(`${road} `);
    if (locality) addressParts.push(locality);

    if (state) {
      const abbreviation = stateAbbreviations[state] || state;
      if (addressParts.length > 0) {
        addressParts.push(", ");
      }
      addressParts.push(abbreviation);
    }

    return addressParts.join("");
  } catch (error) {
    console.error("Error fetching address:", error.message);
    return null;
  }
}

export default getAddress;
