// Import the streamResponse function from another file
import { curate } from "./curate";
import { generateRequestOptions } from "./generateRequestOptions";
import { streamResponse } from "./streamResponse";

// Define the generateText function with async/await functionality
export const generateText = async (
  msgs, // An array of chatlog objects
  max_tokens = 128, // The maximum number of tokens allowed in a response
  temperature = 0.9, // The "creativity" of the response
  fn // A function to handle streaming responses (optional)
) => {
  // Curate the chatlog array to exclude the timestamp property
  const messages = curate(msgs);

  // Define the request options
  const requestOptions = generateRequestOptions(
    messages,
    temperature,
    max_tokens,
    fn
  );

  // Send the completion request to the OpenAI API
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    requestOptions
  );

  // If the response is not ok, throw an error
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message);
  }

  // If fn is not defined, return the response as JSON
  if (!fn) {
    return await response.json();
  }

  // If fn is defined, stream the response and return it as JSON
  return streamResponse(response, fn);
};
