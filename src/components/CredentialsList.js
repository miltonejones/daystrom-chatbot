import React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import MobileMenu from "../styled/MobileMenu";
import { Delete } from "@mui/icons-material";
import Flex from "../styled/Flex";

const TableContainerStyled = styled(TableContainer)({
  maxWidth: 800,
  margin: "0 auto",
  marginTop: 20,
});

const CredentialsList = ({ chatbot }) => {
  const local = window.location.href.indexOf("localhost") > 0;
  const { encryptedCredentials } = chatbot;
  if (!local || !encryptedCredentials) {
    return <i />;
  }
  const credentialKeys = Object.keys(encryptedCredentials);

  if (chatbot.state.can("drop")) {
    return (
      <MobileMenu
        component={Dialog}
        open={chatbot.state.can("drop")}
        onClose={() => chatbot.send("cancel")}
      >
        <Stack sx={{ maxHeight: "30vh", p: 2 }}>
          <Box sx={{ pb: 2 }}>
            Drop credential "{encryptedCredentials[chatbot.loginKey].fullname}"?{" "}
          </Box>
          <Flex>
            <Box sx={{ flexGrow: 1 }} />
            <Button size="small" onClick={() => chatbot.send("cancel")}>
              cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => chatbot.send("drop")}
            >
              Delete
            </Button>
          </Flex>
        </Stack>
      </MobileMenu>
    );
  }

  return (
    <MobileMenu
      component={Dialog}
      open={chatbot.creds && !chatbot.state.can("drop")}
      onClose={() => chatbot.setState("creds", false)}
    >
      <Box
        sx={{
          maxHeight: "50vh",
          overflow: "auto",
        }}
      >
        <TableContainerStyled component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <IconButton />
                </TableCell>
                <TableCell>Full Name</TableCell>
                {/* <TableCell>Key</TableCell> */}
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {credentialKeys.map((key) => (
                <TableRow key={key}>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        chatbot.send({
                          type: "delete login",
                          key,
                        });
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {encryptedCredentials[key].fullname || "-"}
                  </TableCell>
                  {/* <TableCell>{key}</TableCell> */}
                  <TableCell>{encryptedCredentials[key].email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainerStyled>
      </Box>
    </MobileMenu>
  );
};

export default CredentialsList;
