// import {
//   Palette as MuiPallete,
//   PaletteOptions as MuiPaletteOptions,
// } from "@mui/material/styles/createPalette";

import { ButtonPropsColorOverrides } from "@mui/material/Button";

declare module "@mui/material/styles" {
  interface Palette {
    customPink: Palette["primary"];
    customMintGreen: Palette["primary"];
    customDarkGreen: Palette["primary"];
    customAccent: Palette["primary"];
    customBackground: Palette["primary"];
  }

  interface PaletteOptions {
    customPink: PaletteOptions["primary"];
    customMintGreen: PaletteOptions["primary"];
    customDarkGreen: PaletteOptions["primary"];
    customAccent: PaletteOptions["primary"];
    customBackground: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    customPink: true;
  }
}
