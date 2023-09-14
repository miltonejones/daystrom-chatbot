import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Flex = styled(Typography)(({ theme, disabled, link }) => ({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  display: "flex",
  alignItems: "center",
  // justifyContent: "center",
  gap: theme.spacing(2),
  cursor: link ? "pointer" : "default",
  color: !disabled ? theme.palette.common.black : theme.palette.grey[500],
  "&:hover": {
    textDecoration: link ? "underline" : "none",
  },
}));

export default Flex;
