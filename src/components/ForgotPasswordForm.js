import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Drawer,
  Box,
  Stack,
  IconButton,
  Dialog,
} from "@mui/material";
import Flex from "../styled/Flex";
import { Close } from "@mui/icons-material";
import MobileMenu from "../styled/MobileMenu";

export default function ForgotPasswordForm({ chatbot }) {
  const forgot = chatbot.state.matches("forgot password workflow");
  // const [email, setEmail] = useState("");
  const { forgotten: email } = chatbot;
  // const [state, send] = useMachine(chatMachine);

  const handleSubmit = (event) => {
    event.preventDefault();
    chatbot.send({
      type: "submit",
      payload: {
        email,
      },
    });
  };

  const setEmail = (str) => chatbot.setState("forgotten", str);

  return (
    <MobileMenu component={Dialog} anchor="bottom" open={forgot}>
      <form onSubmit={handleSubmit}>
        <Stack sx={{ p: 2 }}>
          <Flex sx={{ alignItems: "baseline" }}>
            <Stack>
              <Typography>Forgot Password</Typography>
              <Typography variant="caption">
                Enter your email address for an email to reset your password.
              </Typography>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton size="small" onClick={() => chatbot.send("cancel")}>
              <Close />
            </IconButton>
          </Flex>
          <TextField
            label="Email"
            type="email"
            size="small"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Flex>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={() => chatbot.send("cancel")}>cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={chatbot.state.value === "submitting"}
            >
              {chatbot.state.value === "submitting" ? (
                <CircularProgress size={24} />
              ) : (
                "Submit"
              )}
            </Button>
          </Flex>
          {chatbot.state.matches("reset failed error") && (
            <Typography variant="body1" color="error">
              {chatbot.state.context.errorMessage}
            </Typography>
          )}
          {chatbot.state.matches("sent confirmation") && (
            <Typography variant="body1">
              A confirmation email has been sent to {email}.
            </Typography>
          )}
        </Stack>
      </form>
    </MobileMenu>
  );
}
