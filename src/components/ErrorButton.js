import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  Typography,
  styled,
  Collapse,
} from "@mui/material";
import processValue from "../util/processValue";

import { List, ListItem, ListItemText } from "@mui/material";
import Flex from "../styled/Flex";
import EllipsisString from "./EllipsisString";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
}));

function ObjectList(props) {
  // Convert the object to an array of [key, value] pairs
  const pairs = Object.entries(props.object);

  return (
    <Collapse in={props.in}>
      <Root>
        <List dense>
          {pairs.map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText
                primary={key}
                secondary={<EllipsisString str={JSON.stringify(value, 0, 2)} />}
              />
            </ListItem>
          ))}
        </List>
      </Root>
    </Collapse>
  );
}

export const ErrorButton = ({ chatbot }) => {
  const [debug, setDebug] = React.useState(false);
  const handleRecover = () => {
    chatbot.send("recover");
  };

  const handleCancel = () => {
    if (chatbot.state.can("cancel")) {
      chatbot.send("cancel");
    }
  };

  return (
    <>
      <Dialog open={chatbot.state.can("recover")} onClose={handleCancel}>
        <DialogTitle>Error </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stack>
              <Typography variant="caption">
                {processValue(chatbot.state.value)}
              </Typography>
              <Typography variant="subtitle2">
                {chatbot.errorMessage}
              </Typography>
              <Typography>Stack {chatbot.state.context.stack}</Typography>
              <Flex link variant="caption" onClick={() => setDebug(!debug)}>
                {!!debug ? "Hide" : "Show"} context
              </Flex>
              {!!chatbot.diagnosis && (
                <fieldset>
                  <legend>Diagnosis</legend>
                  <Typography variant="caption">{chatbot.diagnosis}</Typography>
                </fieldset>
              )}{" "}
            </Stack>
          </DialogContentText>
          <ObjectList in={debug} object={chatbot.state.context} />
        </DialogContent>
        <DialogActions>
          {chatbot.unhealthy && (
            <Button
              variant="contained"
              color="error"
              onClick={() => chatbot.diagnose()}
            >
              diagnose
            </Button>
          )}
          <Button variant="contained" onClick={handleRecover}>
            okay
          </Button>
          {chatbot.state.can("cancel") && (
            <Button onClick={handleCancel}>Cancel</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
