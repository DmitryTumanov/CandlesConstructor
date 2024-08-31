import { type } from "@testing-library/user-event/dist/type";

export const candleItemsMap = {
  0: { url: "simple_candle/candle.glb", name: "Candle" },
  1: { url: "simple_candle/arc.glb", name: "Arc" },
  2: { url: "simple_candle/big_cilynder.glb", name: "Big Cylinder" },
  3: { url: "simple_candle/cilynder.glb", name: "Cylinder" },
  4: { url: "simple_candle/flower.glb", name: "Flower" },
  5: { url: "simple_candle/gear.glb", name: "Gear" },
  6: { url: "simple_candle/hemisphere.glb", name: "Hemisphere" },
  7: { url: "simple_candle/ribbed_cylinder.glb", name: "Ribbed Cylinder" },
  8: { url: "simple_candle/ribbed_frustum.glb", name: "Ribbed Frustum" },
  9: { url: "simple_candle/ribbed_hemisphere.glb", name: "Ribbed Hemisphere" },
  10: { url: "simple_candle/ribbed_sphere.glb", name: "Ribbed Sphere" },
  11: { url: "simple_candle/ribbed_square.glb", name: "Ribbed Square" },
  12: { url: "simple_candle/ring.glb", name: "Ring" },
  13: { url: "simple_candle/small_cilynder.glb", name: "Small Cilynder" },
  14: { url: "simple_candle/sphere.glb", name: "Sphere" },
  15: { url: "simple_candle/ufo.glb", name: "Ufo" },
  16: { url: "simple_candle/volumetric_flower.glb", name: "Volumetric Flower" },
};

export const colorsConfig = {
  RED: {
    color: "#CF3B5E",
    backgroundColor: "rgba(207, 59, 94, 0.2)",
  },
  "RED ORANGE": {
    color: "#E53E4A",
    backgroundColor: "rgba(229, 62, 74, 0.2)",
  },
  ORANGE: {
    color: "#E25601",
    backgroundColor: "rgba(226, 86, 1, 0.2)",
  },
  YELLOW: {
    color: "#E5B330",
    backgroundColor: "rgba(229, 179, 48, 0.2)",
  },
  "LIGHT YELLOW": {
    color: "#EED369",
    backgroundColor: "rgba(238, 211, 105, 0.2)",
  },
  "WHITE CREAM": {
    color: "#DCD6CA",
    backgroundColor: "rgba(220, 214, 202, 0.2)",
  },
  "LIGHT GRAY": {
    color: "#B2B4B3",
    backgroundColor: "rgba(178, 180, 179, 0.2)",
  },
  OLIVE: {
    color: "#768250",
    backgroundColor: "rgba(118, 130, 80, 0.2)",
  },
  "SPRING GREEN": {
    color: "#79B622",
    backgroundColor: "rgba(121, 182, 34, 0.2)",
  },
  GREEN: {
    color: "#56B980",
    backgroundColor: "rgba(86, 185, 128, 0.2)",
  },
  "TEAL BLUE": {
    color: "#56B5D7",
    backgroundColor: "rgba(86, 181, 215, 0.2)",
  },
  "SKY BLUE": {
    color: "#4CA3EC",
    backgroundColor: "rgba(76, 163, 236, 0.2)",
  },
  "ROYAL BLUE": {
    color: "#2861D4",
    backgroundColor: "rgba(40, 97, 212, 0.2)",
  },
  VIOLET: {
    color: "#694482",
    backgroundColor: "rgba(228, 200, 255, 0.89)",
  },
  LILAC: {
    color: "#CE98D3",
    backgroundColor: "rgba(206, 152, 211, 0.2)",
  },
  "DARK PINK": {
    color: "#C54684",
    backgroundColor: "rgba(197, 70, 132, 0.2)",
  },
  PINK: {
    color: "#E78BB4",
    backgroundColor: "rgba(231, 139, 180, 0.2)",
  },
  "NEON PINK": {
    color: "#FDA7C6",
    backgroundColor: "rgba(253, 167, 198, 0.2)",
  },
};

export const collorPalettes = {
  0: {
    name: "Palette",
    colors: [colorsConfig["RED"], colorsConfig["ORANGE"], colorsConfig["PINK"]],
  },
  1: {
    name: "Second",
    colors: [
      colorsConfig["YELLOW"],
      colorsConfig["OLIVE"],
      colorsConfig["GREEN"],
    ],
  },
};

export const assembledCandlesMap = {
  "Default candle": {
    isEditMode: false,
    isSelected: true,
    items: [],
  },
  "Red Candle": {
    isEditMode: false,
    isSelected: true,
    items: [
      {
        type: "6",
        colorName: "RED",
        color: "#CF3B5E",
        isSelected: false,
        isRotated: false,
      },
      {
        type: "4",
        colorName: "DARK PINK",
        color: "#C54684",
        isSelected: false,
        isRotated: false,
      },
      {
        type: "9",
        colorName: "RED ORANGE",
        color: "#E53E4A",
        isSelected: false,
        isRotated: true,
      },
      {
        type: "14",
        colorName: "RED",
        color: "#CF3B5E",
        isSelected: false,
        isRotated: false,
      },
    ],
  },
};

export const maxCandlesInRow = 4;
export const maxCandles = 12;
export const maxRows = Math.floor(maxCandles / maxCandlesInRow);
export const centerPosition = [];
export const defaultCandleColor = "#d9d9d9";
export const defaultCandleItemColorName = "WHITE CREAM";
export const defaultCandleItemColor =
  colorsConfig[defaultCandleItemColorName].color;
export const candleSelectionColor = "#363636";
