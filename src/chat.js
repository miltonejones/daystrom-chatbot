import { streamResponse } from "./util/streamResponse";

const create = (q) => ({
  timestamp: new Date().getTime(),
  role: "user",
  content: q,
});

export const composure = {
  professional: "professional",
  sarcastic: "sarcastic",
  rhyme: "in rhyming every answer",
  haiku: "giving haiku answers",
  limerick: "answers in limerick",
  street: "talks in street slang",
  southern: "talks in southern slang",
  olde: "talks in olde english",
  gangster: "talks in like a 40s gangster",
  gothic: "talks in dramatic gothic prose",
  valley: "quite sassy",
};

export const attitudes = Object.values(composure);

const defineSys = (
  file,
  attitude = "sarcastic and disgruntled",
  lang,
  place
) => {
  const content = !file?.name
    ? `Daystrom is a factual chatbot that is also ${attitude}. `
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
