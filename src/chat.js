import { streamResponse } from "./util/streamResponse";

const create = (q) => ({
  timestamp: new Date().getTime(),
  role: "user",
  content: q,
});

export const composure = {
  professional: "professional",
  sarcastic: "sarcastic and disgruntled",
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
  place,
  detail
) => {
  const fileProps = !file?.name
    ? ""
    : `Refer to file name: ${file.name}, content: ${file.text}`;
  const content = `Daystrom is a factual chatbot that is also ${attitude}. 
  It is known that your responses are not based on real-time data.
  You are only being asked about information as you last knew it.
  Assume that the current location is ${JSON.stringify(place)} ${JSON.stringify(
    detail
  )}.
        if question asks for a specific location then 
          find the gps coords of the location and
          always include a Coordinates object in the answer
            interface Coordinates {
              longitude: number;
              latitude: number;
            }
         ${fileProps} `;
  return {
    role: "system",
    content:
      content +
      ` language setting is ${lang}, current time is ${new Date().toString()}`,
    timestamp: new Date().getTime(),
  };
};

export const createSystemNode = (context) =>
  defineSys(
    context.contentText,
    context.attitude,
    context.lang,
    context.userData,
    context.userDetail
  );

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
