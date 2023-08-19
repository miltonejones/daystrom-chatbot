import { getLocation } from "./util/getLocation";

const create = (q) => ({
  timestamp: new Date().getTime(),
  role: "user",
  content: q,
});

export const attitudes = [
  "professional",
  "sarcastic",
  "in rhyme",
  "in haiku",
  "in limerick",
  "street slang",
  "southern slang",
  "olde english",
  "like a 40s gangster",
  "dramatic gothic prose",
];

const defineSys = async (
  file,
  attitude = "sarcastic and disgruntled",
  lang
) => {
  const place = await getLocation();
  const content = !file?.name
    ? `Your answers should be ${attitude} but accurate and complete. `
    : `refer to this ${file.text}`;
  return {
    role: "system",
    content:
      content +
      ` language setting is ${lang}, current location is ${JSON.stringify(
        place
      )}. current time is ${new Date().toString()}`,
    timestamp: new Date().getTime(),
  };
};

const curate = (chatlog) =>
  chatlog.map((log) => {
    const { timestamp, ...rest } = log;
    return rest;
  });

const streamResponse = async (response, fn) => {
  // Read the response as a stream of data
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let innerText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    // Massage and parse the chunk of data
    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");
    // console.log({
    //   lines,
    // });
    const filteredLines = lines
      .map((line) => line.replace(/data: /, "").trim()) // Remove the "data: " prefix
      .filter((line) => line !== "" && line !== "[DONE]"); // Remove empty lines and "[DONE]"
    // console.log({ filteredLines });
    const parsedLines = filteredLines.map((line) => JSON.parse(line)); // Parse the JSON string

    for (const parsedLine of parsedLines) {
      const { choices } = parsedLine;
      const { delta } = choices[0];
      const { content } = delta;
      // Update the UI with the new content
      if (content) {
        innerText += content;
        fn && fn(innerText);
        console.log({ innerText });
      }
    }
  }

  return innerText;
};

/**
 * Generates text using OpenAI's GPT-3 API
 * @async
 * @function
 * @param {string[]} messages - Array of strings representing the conversation history
 * @param {number} temperature - A number between 0 and 1 representing the creativity of the generated text
 * @returns {Promise<Object>} - A Promise that resolves with an object representing the generated text
 */
const generateText = async (msgs, max_tokens = 128, temperature = 0.9, fn) => {
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

  /**
   * Sends a POST request to OpenAI's API and returns a Promise that resolves with the response JSON
   * @async
   * @function
   * @param {string} url - The URL to send the request to
   * @param {Object} options - The options to include in the request
   * @returns {Promise<Object>} - A Promise that resolves with the response JSON
   */
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    requestOptions
  );

  if (!fn) {
    const json = await response.json();
    return json;
  }
  const json = streamResponse(response, fn);
  return json;
};

export { generateText, create, defineSys };
