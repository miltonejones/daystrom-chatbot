import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Flex from "../styled/Flex";

function EllipsisString({ str, len = 30 }) {
  const [showFullText, setShowFullText] = useState(false);

  if (!str) {
    return <>No value</>;
  }

  if (str.length <= len) {
    return <Typography>{str}</Typography>;
  }

  if (showFullText) {
    return (
      <>
        <pre>{str}</pre>
        <Flex link variant="caption" onClick={() => setShowFullText(false)}>
          Read less
        </Flex>
      </>
    );
  }

  return (
    <>
      <Typography>
        {`${str.substring(0, len)}...`}
        <Flex link variant="caption" onClick={() => setShowFullText(true)}>
          Read more
        </Flex>
      </Typography>
    </>
  );
}

export default EllipsisString;
