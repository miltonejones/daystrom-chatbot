async function getAddressFromLatLng({ latitude: lat, longitude: lng }) {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const addressParts = getAddressParts(data.results[0]);
  // alert(JSON.stringify(addressParts));
  return addressParts;
}

function getAddressParts(result) {
  const addressParts = {};

  addressParts.formattedAddress = result.formatted_address;

  for (const component of result.address_components) {
    if (component.types.includes("locality")) {
      addressParts.city = component.long_name;
    } else if (component.types.includes("administrative_area_level_1")) {
      addressParts.state = component.short_name;
    } else if (component.types.includes("country")) {
      addressParts.country = component.long_name;
    } else if (component.types.includes("postal_code")) {
      addressParts.postalCode = component.short_name;
    }
  }

  return addressParts;
}

export { getAddressFromLatLng };
