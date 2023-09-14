import { decryptData } from "./crypto";

export const decryptCredentials = (logins) => {
  const decryptedCredentials = Object.keys(logins).reduce((out, key) => {
    const datum = logins[key];
    out[decryptData(key)] = {
      ...datum,
      password: decryptData(datum.encryptedPassword),
    };
    return out;
  }, {});
  return decryptedCredentials;
};
