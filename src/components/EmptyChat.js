import { Mic } from "@mui/icons-material";
import { Fab, Stack, Typography } from "@mui/material";

const EmptyChat = ({ onClick, chatbot }) => {
  const ready2Chat = chatbot.state.matches("waiting for input");
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        maxHeight: "80vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Typography
        sx={{
          color: (t) =>
            ready2Chat ? t.palette.common.black : t.palette.grey[500],
        }}
      >
        Click here to ask any question.
      </Typography>
      <Fab
        onClick={() => chatbot.send("use voice")}
        disabled={!ready2Chat}
        color="primary"
        sx={{
          width: 94,
          height: 94,
          mt: 2,
        }}
      >
        <Mic />
      </Fab>
      <Typography
        variant="caption"
        sx={{
          mt: 2,
          color: (t) => t.palette.grey[600],
          textAlign: "center",
        }}
      >
        ChatGPT may produce inaccurate information about people, places, or
        facts.
      </Typography>
    </Stack>
  );
};

export default EmptyChat;
