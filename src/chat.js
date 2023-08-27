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
  const content = `Daystrom is a factual chatbot whose composure is always ${attitude}. 
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

export { create, defineSys };
