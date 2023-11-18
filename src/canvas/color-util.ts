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

export function getColorFromNumber(index: number): string {
  const colorIndex = Math.min(index, colors.length - 1);
  return colors[colorIndex];
}
