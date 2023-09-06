// Define the curate function to remove the timestamp property from chatlog objects
export const curate = (chatlog) =>
  chatlog.map((log) => {
    const { timestamp, ...rest } = log;
    return rest;
  });
