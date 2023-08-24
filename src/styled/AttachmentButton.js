import React from "react";
import IconButton from "@mui/material/IconButton";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { Box, Card, Dialog, Modal, Stack, Typography } from "@mui/material";
import { Close, Code } from "@mui/icons-material";

function truncateString(str, limit) {
  if (str.length > limit) {
    return str.slice(0, limit) + "...";
  } else {
    return str;
  }
}

function AttachmentButton({ fileLoaded, contentText, ...props }) {
  const fileInputRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 3072) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fileLoaded({
          name: file.name,
          size: file.size,
          text: e.target.result,
        });
      };
      reader.readAsText(file);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (contentText?.name) {
    return (
      <>
        <Card
          onClick={handleOpen}
          sx={{
            p: (t) => t.spacing(0.5, 1),
            "&:hover": {
              backgroundColor: "#eee",
              cursor: "pointer",
            },
          }}
        >
          <Stack>
            <Typography
              className="clip"
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                fontSize: "0.7rem",
                lineHeight: 1.1,
              }}
              variant="caption"
            >
              {truncateString(contentText.name, 24)}
            </Typography>
            <Typography
              sx={{
                lineHeight: 1,
                fontSize: "0.6rem",
                textAlign: "right",
              }}
              variant="caption"
            >
              {contentText.size} bytes
            </Typography>
          </Stack>
        </Card>
        <Dialog maxWidth="lg" open={open} onClose={handleClose}>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <Code />
              <Typography>{contentText.name}</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Stack>

            <Box
              sx={{
                width: "calc(100% - 32px)",
                overflow: "auto",
                bgcolor: "#f0f0f0",
                p: 2,
              }}
            >
              <pre
                style={{
                  maxHeight: 400,
                }}
              >
                {contentText.text}
              </pre>
            </Box>
          </Box>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".txt, .json, .js, .py"
        onChange={handleFileChange}
      />

      <IconButton {...props} onClick={() => fileInputRef.current.click()}>
        <AttachmentIcon />
      </IconButton>
    </>
  );
}

export default AttachmentButton;
