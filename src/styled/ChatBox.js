import { styled } from "@mui/material/styles";

/**
 * A scrollable container for displaying a chat interface.
 * @param {Object} props - The component props.
 * @param {number} props.offset - The offset from the top of the page in pixels.
 * @returns {JSX.Element} - The rendered component.
 */
const ChatBox = styled("div")(({ theme, offset }) => ({
  marginBottom: theme.spacing(1),
  height: `calc(100vh - ${offset + 24}px)`,
  overflow: "scroll",
}));

export default ChatBox;
