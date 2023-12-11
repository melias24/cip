import { IconButton, extendTheme, useColorMode } from "@chakra-ui/react";
import { theme } from "@chakra-ui/pro-theme";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const proTheme = extendTheme(theme);
const extenstion = {
  colors: { ...proTheme.colors, brand: proTheme.colors.teal },
  fonts: {
    heading: "'Inter Variable', -apple-system, system-ui, sans-serif",
    body: "'Inter Variable', -apple-system, system-ui, sans-serif",
  },
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const PRO_THEME = extendTheme({ ...extenstion, config }, proTheme);

export const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="color-switcher"
      icon={colorMode === "light" ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
      onClick={toggleColorMode}
      colorScheme={"gray"}
      size={"lg"}
    />
  );
};
