import { Typography } from "@mui/material";
import TinyButton from "../styled/TinyButton";
import { Add } from "@mui/icons-material";

function ChatButton({ onClick, icon: Icon = Add, children }) {
  return (
    <Typography
      sx={{ pt: 2, cursor: "pointer" }}
      onClick={onClick}
      variant="caption"
    >
      <TinyButton icon={Icon} />
      {children}
    </Typography>
  );
}

export default ChatButton;
