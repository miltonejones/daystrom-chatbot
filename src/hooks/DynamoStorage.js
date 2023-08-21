class DynamoStorage {
  endpoint = "https://storage.puppeteerstudio.com";

  /**
   * reads all items for a given auth_key from the dynamo table
   * @param {string} auth_key - identifier for the current user
   * @returns array of items
   */
  async getItems(auth_key) {
    // send GET request
    const response = await fetch(this.endpoint + `/${auth_key}`);
    return await response.json();
  }

  /**
   * reads an item from the dynamo table
   * @param {string} auth_key - identifier for the current user
   * @param {string} data_key - identifing key for the selected value
   * @returns item value
   */
  async getItem(auth_key, data_key) {
    // send GET request
    const response = await fetch(this.endpoint + `/${auth_key}/${data_key}`);
    try {
      const value = await response.json();
      return atob(value);
    } catch (e) {
      console.log({ e });
      return false;
    }
  }

  /**
   * adds an item to the dynamo table
   * @param {string} auth_key - identifier for the current user
   * @param {string} data_key - identifing key for the selected value
   * @param {object} data_value - value to assign to this key
   * @returns object with success message
   */
  async setItem(auth_key, data_key, data_value) {
    // build request options
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_key,
        data_key,
        data_value: btoa(data_value),
      }),
    };

    // send POST request
    const response = await fetch(this.endpoint, requestOptions);
    return await response.json();
  }

  /**
   * deletes an item from the dynamo table
   * @param {string} auth_key - identifier for the current user
   * @param {string} data_key - identifing key for the selected value
   */
  async removeItem(auth_key, data_key) {
    // build request options
    const requestOptions = {
      method: "DELETE",
    };

    // send DELETE request
    const response = await fetch(
      this.endpoint + `/${auth_key}/${data_key}`,
      requestOptions
    );
    return await response.json();
  }

  /**
   * deletes all items from the dynamo table for the current user
   * @param {string} auth_key - identifier for the current user
   */
  async removeItems(auth_key) {
    // build request options
    const requestOptions = {
      method: "DELETE",
    };

    // send DELETE request
    const response = await fetch(
      this.endpoint + `/${auth_key}`,
      requestOptions
    );
    return await response.json();
  }
}

const store = new DynamoStorage();
const dynamoStorage = () => {
  // auth key alwas the same
  const auth_key = "anon-api-chatbot";

  const getItem = async (name) => {
    return await store.getItem(auth_key, name);
  };

  const removeItem = async (name) => {
    return await store.removeItem(auth_key, name);
  };

  const setItem = async (name, value) =>
    await store.setItem(auth_key, name, value);
  return { getItem, setItem, removeItem };
};

export default dynamoStorage;
