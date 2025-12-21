export type ColorTheme = {
  primary: string;
  secondary: string;
  third: string;
  textPrimary: string;
  textPrimaryDisabled: string;
  textSecondary: string;
  success: string;
  error: string;
  warning: string;
};

export type TColors = ColorTheme;

type ColorPalettes = {
  light: TColors;
  dark: TColors;
};

export const Colors: ColorPalettes = {
  dark: {
    primary: '#000000',
    secondary: '#1E1E21',
    third: '#1E1E21',
    textPrimary: '#FFFFFF',
    textPrimaryDisabled: '#FFFFFF40',
    textSecondary: '#FFFFFF',
    success: '#7CFF90',
    error: '#FF7C7C',
    warning: '#FDF558',
  },
  light: {
    primary: '#FFFFFF',
    secondary: '#EDEDED',
    third: '#0183FD20',
    textPrimary: '#000000',
    textPrimaryDisabled: '#00000040',
    textSecondary: '#0183FD',
    success: '#2d8f4f',
    error: '#D32F2F',
    warning: '#F57C00',
  },
};
