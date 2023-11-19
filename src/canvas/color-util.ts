const colors = [
  "black",
  "maroon",
  "fuchsia",
  "olive",
  "navy",
  "purple",
  "teal",
  "gray",
  "silver",
  "blue",
  "lime",
  "yellow",
  "red",
  "green",
  "aqua",
  "darkgray",
  "lightgray",
];

export const MAX_COLOR = colors.length - 1;

export const getColorFromNumber = (
  index: number,
  maxColor?: number,
): string => {
  const colorIndex = Math.min(index, maxColor ?? MAX_COLOR);
  return colors[colorIndex];
};
