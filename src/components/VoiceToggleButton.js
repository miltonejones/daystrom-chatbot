import React from "react";
import { IconButton } from "@mui/material";
import { VolumeUp, VolumeOff } from "@mui/icons-material";

const VoiceToggleButton = ({ speak, setSpeak }) => {
  const handleSpeakerClick = () => {
    setSpeak(!speak);
  };

  return (
    <div style={{ position: "fixed", bottom: 72, left: 16 }}>
      <IconButton color="primary" onClick={handleSpeakerClick}>
        {speak ? <VolumeUp /> : <VolumeOff />}
      </IconButton>
    </div>
  );
};

export default VoiceToggleButton;
