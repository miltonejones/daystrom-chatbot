import { Typography } from "@mui/material";
import moment from "moment";

function TimeStamp({ time, align }) {
  if (isNaN(time)) return <i />;
  return (
    <Typography
      component="div"
      sx={{
        whiteSpace: "nowrap",
        color: (t) => t.palette.grey[500],
        textAlign: align,
        width: "100%",
      }}
      variant="caption"
    >
      {formatTime(time)}
    </Typography>
  );
}

function formatTime(ms) {
  const timestamp = moment(ms);

  // Check if the timestamp is from today
  if (moment().isSame(timestamp, "day")) {
    return timestamp.format("hh:mm a");
  } else {
    return timestamp.format("ddd hh:mm a");
  }
}

export default TimeStamp;
