import { Box, Typography } from "@mui/material";
import TinyButton from "../styled/TinyButton";
import { ExpandMore } from "@mui/icons-material";

export const Summary = ({ onClick, children }) => {
  return (
    <Box
      sx={{
        ml: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={onClick}
        variant="subtitle2"
      >
        {children}
      </Typography>
      <TinyButton icon={ExpandMore} onClick={onClick} />
    </Box>
  );
};
