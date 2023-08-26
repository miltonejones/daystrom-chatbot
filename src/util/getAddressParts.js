function getAddressParts(addressJson) {
  const streetNumber = addressJson.results[0].address_components.find(
    (c) => c.types[0] === "street_number"
  ).long_name;
  const street = addressJson.results[0].address_components.find(
    (c) => c.types[0] === "route"
  ).long_name;
  const city = addressJson.results[0].address_components.find(
    (c) => c.types[0] === "locality"
  ).long_name;
  const state = addressJson.results[0].address_components.find(
    (c) => c.types[0] === "administrative_area_level_1"
  ).short_name;
  const zip = addressJson.results[0].address_components.find(
    (c) => c.types[0] === "postal_code"
  ).long_name;

  return {
    street: `${streetNumber} ${street}`,
    city,
    state,
    zip,
  };
}

export { getAddressParts };
