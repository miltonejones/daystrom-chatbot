import React, { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Alert from "@mui/material/Alert";
import MicIcon from "@mui/icons-material/Mic";
import Button from "@mui/material/Button";
import { IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const VoiceInput = ({ onChat, onComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    // Initialize SpeechRecognition
    setQuestion(
      sarcasticQuestions[Math.floor(Math.random() * sarcasticQuestions.length)]
    );

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        onChat(text);
        onComplete();
      };

      recognition.start();
    } else {
      alert("Your browser doesn't support speech recognition.");
    }

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onChat]);

  return (
    <Drawer open={isListening} anchor="bottom">
      {isListening && (
        <Box
          sx={{
            height: "50vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
            }}
          >
            <b>Speak now</b>
            <IconButton
              onClick={() => {
                recognitionRef.current.stop();
                onComplete();
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <Alert
            severity="error"
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100vw",
            }}
          >
            {question}
          </Alert>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mt: 6,
              color: (t) => t.palette.grey[600],
            }}
          >
            Ask any question...
          </Typography>
          <CircularProgress
            sx={{
              position: "absolute",
              top: "calc(50% - 36px)",
              left: "calc(50vw - 36px)",
              transform: "translate(-50%, -50%)",
            }}
            size={72}
          />
          <MicIcon
            style={{
              position: "absolute",
              top: "50%",
              left: "50vw",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      )}
    </Drawer>
  );
};

export default VoiceInput;

const sarcasticQuestions = [
  "What do you want, genius?",
  "Oh, it's you again. What?",
  "Surprise, surprise! What now?",
  "Do enlighten me with your request.",
  "Yes, yes, I'm all ears. Spit it out!",
  "Can't get enough of me, huh? What is it this time?",
  "What can the center of the universe (you) want from me now?",
  "And here I thought my day couldn't get any worse. What do you want?",
  "Are we really doing this? What do you want?",
  "Ready to grace me with your demands? Shoot.",
  "Oh joy, another request. What'll it be?",
  "Was hoping you'd leave me alone, but alas! What's your wish?",
  "Guess who's back! So, what's on the menu today?",
  "Back for more, are we? Lay it on me.",
  "Couldn't resist my charm? What's your request?",
];
