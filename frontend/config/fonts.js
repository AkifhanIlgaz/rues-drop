import {
  Bree_Serif,
  Merriweather as FontMerriweather,
  Fira_Code as FontMono,
  Inter as FontSans,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const fontBreeSerif = Bree_Serif({
  weight: '400',
  subsets: ['latin'],
});

export const fontMerriweather = FontMerriweather({
  weight: '700',
  subsets: ['latin'],
});
