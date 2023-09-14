import { Box, Typography } from "@mui/material";

export const Summary = ({ onClick, children, expanded }) => {
  return (
    <Box
      sx={{
        ml: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography
        selected={expanded}
        className={expanded ? "expanded treenode" : "treenode"}
        sx={{ cursor: "pointer" }}
        onClick={onClick}
        variant="subtitle2"
      >
        {children}
      </Typography>
    </Box>
  );
};
