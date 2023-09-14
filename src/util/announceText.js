function announceText(speechText, lang = "en-US") {
  // Check if speech synthesis is supported in the browser
  if ("speechSynthesis" in window) {
    const [prefix] = lang.split("-");

    // Create a new SpeechSynthesisUtterance object
    var utterance = new SpeechSynthesisUtterance(speechText);
    const voices = speechSynthesis.getVoices();
    const accents = voices.filter((voice) => voice.lang === lang);
    const seconds = voices.filter((voice) => voice.lang.indexOf(prefix) === 0);

    const [accent] = accents;
    const [second] = seconds;

    // console.log({ voices, accents, second });
    // Use the default speech synthesis voice
    utterance.voice = accent || second;
    // Set the language to US English (en-US)
    utterance.lang = lang;

    // Start speaking the text
    speechSynthesis.speak(utterance);
  } else {
    console.error("Speech synthesis is not supported in this browser.");
  }
}

export { announceText };
