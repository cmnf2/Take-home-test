"use strict";

export function generateColor(): string {
  return Math.floor(Math.random() * 16777215).toString(16);
}

export function randomizeSvgColors(svgString:string): string {
  const matchAllFillsWithHexColors: RegExp = /fill="[^"]{4,}"/gm;

  return svgString.replace(
    matchAllFillsWithHexColors,
    () => `fill="#${generateColor()}"`
  );
}