import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Flex = styled(Typography)(({ theme }) => ({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

export default Flex;
