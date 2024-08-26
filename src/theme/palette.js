import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to right, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#edf4fc',
  light: '#D0E4FC',
  main: '#255AE8',
  dark: '#06186E',
};
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#1976D2',
  main: '#9C27B0',
  dark: '#1939B7',
  darker: '#091A7A',
};
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};
const SUCCESS = {
  lighter: alpha('#2E7D32', 0.12),
  light: alpha('#2E7D32', 0.3),
  main: '#4CAF50',
  dark: '#229A16',
  darker: '#08660D',
  a200: '#69F0AE',
  900: '#1B5E20',
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};
const ERROR = {
  lighter: alpha('#D32F2F', 0.12),
  light: alpha('#D32F2F', 0.3),
  main: '#D32F2F',
  dark: '#B72136',
  darker: '#7A0C2E',
  100: '#FECDD2',
};

const GRADIENTS = {
  primary: createGradient('#9C27B0', '#1C44C7'),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const GREY = {
  100: '#F5F5F5',
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  darkgrey: 'rgba(0,0,0,0.08)',
  lightgrey: 'rgba(0,0,0,0.04)',
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  error: { ...ERROR, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: '#fff' },
  gradients: GRADIENTS,
  grey: GREY,
  linkedin: '#0077b5',
  action: {
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    background: { paper: '#fff', default: '#F4F7FA' },
    action: { ...COMMON.action },
  },
};

export default palette;
