import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Divider, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Switch, FormControlLabel } from "@mui/material";
import CustomSlider from "./CustomSlider";

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
        <Typography sx={{ mt: 1.5 }} variant="caption">
          Temperature
        </Typography>
        <CustomSlider
          value={temp}
          min={0}
          max={1}
          step={0.1}
          onChange={setTemp}
        />
        <Typography sx={{ mt: 1.5 }} variant="caption">
          Max Tokens
        </Typography>
        <CustomSlider
          value={Math.log2(tokens)}
          min={7}
          max={11}
          step={1}
          binary
          onChange={setTokens}
        />
        <Typography sx={{ mt: 1.5 }} variant="caption">
          Language
        </Typography>
        <TextField
          select
          size="small"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          fullWidth
        >
          {langs.map((item, index) => (
            <MenuItem key={index} value={item.languageCode}>
              {item.nativeLanguageName}
            </MenuItem>
          ))}
        </TextField>

        <Flex spacing={2} sx={{ width: "100%" }}>
          <Stack>
            <Typography sx={{ mt: 1.5 }} variant="caption">
              Composure
            </Typography>
            <TextField
              select
              size="small"
              value={attitude}
              onChange={handleSelectChange}
              fullWidth
            >
              {Object.keys(items).map((item, index) => (
                <MenuItem key={index} value={items[item]}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

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

const Option = ({ value, onChange }) => {
  const handleToggle = (event) => {
    onChange(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={value}
            onChange={handleToggle}
            name="autoOpen"
            color="primary"
          />
        }
        label={value ? "ON" : "OFF"}
      />
    </div>
  );
};

const Flex = ({ children, ...props }) => {
  return (
    <Stack direction="row" alignItems="center" {...props}>
      {children}
    </Stack>
  );
};

const langs = [
  {
    languageCode: "en-US",
    languageName: "English (United States)",
    nativeLanguageName: "English",
  },
  {
    languageCode: "es-ES",
    languageName: "Spanish (Spain)",
    nativeLanguageName: "Español",
  },
  {
    languageCode: "fr-FR",
    languageName: "French (France)",
    nativeLanguageName: "Français",
  },
  {
    languageCode: "de-DE",
    languageName: "German (Germany)",
    nativeLanguageName: "Deutsch",
  },
  {
    languageCode: "zh-CN",
    languageName: "Chinese (Mandarin, China)",
    nativeLanguageName: "中文",
  },
  {
    languageCode: "ru-RU",
    languageName: "Russian (Russia)",
    nativeLanguageName: "Русский",
  },
  {
    languageCode: "ja-JP",
    languageName: "Japanese (Japan)",
    nativeLanguageName: "日本語",
  },
  {
    languageCode: "it-IT",
    languageName: "Italian (Italy)",
    nativeLanguageName: "Italiano",
  },
  {
    languageCode: "pt-BR",
    languageName: "Portuguese (Brazil)",
    nativeLanguageName: "Português",
  },
  {
    languageCode: "ar-SA",
    languageName: "Arabic (Saudi Arabia)",
    nativeLanguageName: "العربية",
  },
  {
    languageCode: "hi-IN",
    languageName: "Hindi (India)",
    nativeLanguageName: "हिन्दी",
  },
  {
    languageCode: "ko-KR",
    languageName: "Korean (South Korea)",
    nativeLanguageName: "한국어",
  },
  {
    languageCode: "sv-SE",
    languageName: "Swedish (Sweden)",
    nativeLanguageName: "Svenska",
  },
  {
    languageCode: "nl-NL",
    languageName: "Dutch (Netherlands)",
    nativeLanguageName: "Nederlands",
  },
  {
    languageCode: "pl-PL",
    languageName: "Polish (Poland)",
    nativeLanguageName: "Polski",
  },
];

export default SettingsDrawer;
