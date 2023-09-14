import CryptoJS from "crypto-js";
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

export const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY);
  return ciphertext.toString();
};
export const decryptData = (encryptedData) => {
  console.log({ ENCRYPTION_KEY });
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
};
