import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Divider, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

function generateMarks(min, max, step, binary) {
  const marks = [];

  for (let value = min; value <= max; value += step) {
    marks.push({
      label: binary ? Math.pow(2, value) : value.toFixed(1).toString(),
      value: value,
    });
  }

  return marks;
}

class CustomSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });

    if (this.props.binary) {
      const valueInBinary = Math.pow(2, newValue);
      this.props.onChange(valueInBinary);
    } else {
      this.props.onChange(newValue);
    }
  };

  render() {
    const { min, max, step, binary } = this.props;
    return (
      <Slider
        marks={generateMarks(min, max, step, binary)}
        value={this.state.value}
        onChange={this.handleChange}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
      />
    );
  }
}

const SettingsPopover = ({
  items,
  attitude,
  setAttitude,
  temp,
  setTemp,
  tokens,
  setTokens,
  lang,
  setLang,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "settings-popover" : undefined;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSelectChange = (event) => {
    setAttitude(event.target.value);
  };

  return (
    <Box>
      <IconButton onClick={handlePopoverOpen} color="inherit">
        <SettingsIcon />
      </IconButton>
      <Drawer
        id={id}
        open={isOpen}
        onClose={handlePopoverClose}
        anchor="bottom"
      >
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
            displayEmpty
            fullWidth
          >
            {langs.map((item, index) => (
              <MenuItem key={index} value={item.languageCode}>
                {item.nativeLanguageName}
              </MenuItem>
            ))}
          </TextField>
          <Typography sx={{ mt: 1.5 }} variant="caption">
            Composure
          </Typography>
          <TextField
            select
            size="small"
            value={attitude}
            onChange={handleSelectChange}
            displayEmpty
            fullWidth
          >
            {Object.keys(items).map((item, index) => (
              <MenuItem key={index} value={items[item]}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Drawer>
    </Box>
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

export default SettingsPopover;
