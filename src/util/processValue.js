function processValue(value) {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "object") {
    const key = Object.keys(value)[0];
    return `${key}.${value[key]}`;
  } else {
    return "";
  }
}

export default processValue;
