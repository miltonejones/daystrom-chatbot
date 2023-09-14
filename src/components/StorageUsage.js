import React from "react";
import { Typography, LinearProgress, Card } from "@mui/material";
import { styled } from "@mui/system";

const StorageProgress = styled(LinearProgress)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(2),
}));

const StorageUsageContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: theme.spacing(2),
}));

const StorageUsage = ({ conversations }) => {
  const storageUsed = new Blob([JSON.stringify(conversations)]).size;
  const storagePercentage = (storageUsed / 125000) * 100;

  return (
    <StorageUsageContainer>
      <Typography variant="body1">Storage Usage</Typography>
      <Typography variant="caption">
        {`${(storageUsed / 1000).toFixed(2)} KB / 125 KB`}
      </Typography>
      <StorageProgress variant="determinate" value={storagePercentage} />
    </StorageUsageContainer>
  );
};

export default StorageUsage;
