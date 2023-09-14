import React from "react";
import { Dialog, DialogTitle, Button, Typography, Box } from "@mui/material";
import MobileMenu from "../styled/MobileMenu";
import Flex from "../styled/Flex";

function ChoiceDialog({ chatbot }) {
  return (
    <MobileMenu
      component={Dialog}
      open={chatbot.state.can("yes")}
      onClose={() => chatbot.send("no")}
    >
      <DialogTitle>Import conversations?</DialogTitle>
      <Typography sx={{ p: 2 }}>
        Import the conversations on your local computer to the cloud?
      </Typography>
      <Flex>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={() => chatbot.send("no")} color="primary">
          No
        </Button>
        <Button onClick={() => chatbot.send("yes")} color="secondary">
          Yes
        </Button>
      </Flex>
    </MobileMenu>
  );
}

export default ChoiceDialog;
