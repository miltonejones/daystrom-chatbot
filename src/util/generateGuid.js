function generateGuid() {
  let guid = "";
  for (let i = 0; i < 11; i++) {
    let randomNum = Math.floor(Math.random() * 16);
    if (randomNum < 10) {
      guid += randomNum;
    } else {
      guid += String.fromCharCode(randomNum + 87);
    }
  }
  return guid;
}

export { generateGuid };
