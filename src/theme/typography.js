import { pxToRem } from '../utils/getFontValue';

// ----------------------------------------------------------------------

const FONT_PRIMARY = 'DM Sans, sans-serif'; // Google Font

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  button: {
    fontWeight: 500,
    lineHeight: 24 / 15,
    letterSpacing: '0.46px',
    fontSize: pxToRem(15),
  },
};

export default typography;
