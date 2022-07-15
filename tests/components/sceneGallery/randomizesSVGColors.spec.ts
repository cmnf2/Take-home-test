import { randomizeSvgColors, generateColor } from '@components/helpers/randomizeSVGColors';

const testSVG:string = '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="#fff" stroke-width="3" fill="#000" /></svg>'

describe('generateColor', () => {
  test('returns a valid hex code', () => {
    const hexCodeMatchRegexp: RegExp = /^#[0-9A-F]{6}$/i;
    const hexCode = generateColor();

    expect(`#${hexCode}`).toMatch(hexCodeMatchRegexp);
  });
});


describe('randomizeSvgColors', () => {
  test('Changes the hex value inside SVG fills, but not the stroke', () => {
    const matchStrokeRegexp = /stroke="[^"]{4,}"/;
    const matchFillRegexp = /fill="[^"]{4,}"/;
    const svgChanged:string = randomizeSvgColors(testSVG);

    const svgChangedStroke = svgChanged.match(matchStrokeRegexp);
    const svgChangedFill = svgChanged.match(matchFillRegexp);

    expect(svgChangedFill[0]).not.toEqual('fill="#000000"');
    expect(svgChangedStroke[0]).toEqual('stroke="#fff"');
  });
});
