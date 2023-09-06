// Define the generateRequestOptions function to create the request options object
export const generateRequestOptions = (
  messages,
  temperature,
  max_tokens,
  fn
) => {
  const model = "gpt-3.5-turbo-0301";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({
      messages,
      temperature: Number(temperature),
      model,
      max_tokens: Number(max_tokens),
      stream: !!fn, // Convert fn to a boolean value
    }),
  };
  return requestOptions;
};
