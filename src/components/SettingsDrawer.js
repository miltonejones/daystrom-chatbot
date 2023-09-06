import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Divider, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Switch, FormControlLabel } from "@mui/material";
import CustomSlider from "./CustomSlider";
import { langs } from "../langs";
import DropdownSelect from "./DropdownSelect";
import { Option } from "./Option";

const SettingsDrawer = ({
  items,
  chatbot,
  handlePopoverClose,
  handleSelectChange,
  isOpen,
}) => {
  // const [anchorEl, setAnchorEl] = useState(null);
  const {
    attitude,
    // setAttitude,
    temp,
    setTemp,
    tokens,
    setTokens,
    lang,
    setLang,
  } = chatbot;

  // const isOpen = Boolean(anchorEl);
  const id = isOpen ? "settings-popover" : undefined;

  return (
    <Drawer id={id} open={isOpen} onClose={handlePopoverClose} anchor="bottom">
      <Stack
        sx={{
          p: (t) => t.spacing(0, 1, 0, 2),
          justifyContent: "space-between",
          alignItems: "center",
        }}
        direction="row"
      >
        <Typography variant="subtitle2">Chatbot settings</Typography>
        <IconButton onClick={handlePopoverClose}>
          <Close />
        </IconButton>
      </Stack>
      <Divider style={{ width: "100%" }} />
      <Stack sx={{ p: (t) => t.spacing(0, 3, 3, 3) }}>
        <CustomSlider
          label="Temperature"
          value={temp}
          min={0}
          max={1}
          step={0.1}
          onChange={setTemp}
        />
        <CustomSlider
          value={Math.log2(tokens)}
          label="Max Tokens"
          min={7}
          max={11}
          step={1}
          binary
          onChange={setTokens}
        />

        <DropdownSelect
          value={lang}
          onChange={handleSelectChange}
          items={langs.map((item) => ({
            value: item.languageCode,
            label: item.nativeLanguageName,
          }))}
        >
          Language
        </DropdownSelect>

        <Flex spacing={2} sx={{ width: "100%" }}>
          <DropdownSelect
            value={attitude}
            onChange={handleSelectChange}
            items={Object.keys(items).map((item) => ({
              value: items[item],
              label: item,
            }))}
          >
            Composure
          </DropdownSelect>

          <Stack>
            <Typography sx={{ mt: 1.5 }} variant="caption">
              Auto Open
            </Typography>
            <Option
              value={chatbot.autoOpen === "true"}
              onChange={(e) => chatbot.setAutoOpen(e ? "true" : "false")}
            />
          </Stack>

          <Stack>
            <Typography sx={{ mt: 1.5 }} variant="caption">
              Machine state
            </Typography>

            <Typography variant="caption">
              <b> {JSON.stringify(chatbot.state.value)}</b>
            </Typography>
          </Stack>
        </Flex>
      </Stack>
    </Drawer>
  );
};

const Flex = ({ children, ...props }) => {
  return (
    <Stack
      direction="row"
      {...props}
      sx={{ alignItems: "center", ...props.sx }}
    >
      {children}
    </Stack>
  );
};

export default SettingsDrawer;
