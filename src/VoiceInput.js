import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MicIcon from "@mui/icons-material/Mic";
import { Fab, IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { pulsate } from "./util/pulsate";

const VoiceInput = ({ chatbot }) => {
  return (
    <Drawer open anchor="bottom">
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
              chatbot.send("cancel");
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <Stack>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mt: 6,
              color: (t) => t.palette.grey[600],
            }}
          >
            {chatbot.question}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
            }}
          >
            {chatbot.transcript}
          </Typography>
        </Stack>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Fab
            color="primary"
            sx={{
              width: 72,
              height: 72,
              transform: "translate(-50%, -50%)",
              animation: `${pulsate} 1.5s infinite`,
            }}
          >
            <MicIcon />
          </Fab>
        </Box>
      </Box>
    </Drawer>
  );
};

export default VoiceInput;
