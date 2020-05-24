import React from "react";
import { useColorMode, IconButton } from "@chakra-ui/core";

export function ThemeToggle({ show }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <IconButton
        rounded="full"
        onClick={toggleColorMode}
        icon={colorMode === "light" ? "moon" : "sun"}
        mr={6}
      >
        Change Color Mode
      </IconButton>
    </header>
  );
}
