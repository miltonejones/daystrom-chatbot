import { streamResponse } from "./streamResponse";

/**
 * Generates text using OpenAI's GPT-3 API
 * @async
 * @function
 * @param {string[]} messages - Array of strings representing the conversation history
 * @param {number} temperature - A number between 0 and 1 representing the creativity of the generated text
 * @returns {Promise<Object>} - A Promise that resolves with an object representing the generated text
 */
export const generateText = async (
  msgs,
  max_tokens = 128,
  temperature = 0.9,
  fn
) => {
  const messages = curate(msgs);
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
      stream: !!fn,
    }),
  };

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    requestOptions
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message);
  }

  if (!fn) {
    const json = await response.json();
    return json;
  }
  const json = streamResponse(response, fn);
  return json;
};

const curate = (chatlog) =>
  chatlog.map((log) => {
    const { timestamp, ...rest } = log;
    return rest;
  });
