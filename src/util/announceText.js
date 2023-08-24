function announceText(speechText, lang = "en-US") {
  // Check if speech synthesis is supported in the browser
  if ("speechSynthesis" in window) {
    // Create a new SpeechSynthesisUtterance object
    var utterance = new SpeechSynthesisUtterance(speechText);

    // Use the default speech synthesis voice
    utterance.voice = speechSynthesis.getVoices()[0];
    // Set the language to US English (en-US)
    utterance.lang = lang;

    // Start speaking the text
    speechSynthesis.speak(utterance);
  } else {
    console.error("Speech synthesis is not supported in this browser.");
  }
}

export { announceText };
