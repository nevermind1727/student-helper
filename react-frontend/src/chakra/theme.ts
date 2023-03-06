import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme(
  { config },
  {
    fonts: {
      body: "Roboto",
    },
  }
);

export default theme;
