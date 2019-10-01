export const fonts: { [key: string]: string } = {
  // Serif Fonts
  georgia: 'Georgia, serif',
  palatino: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
  times: '"Times New Roman", Times, serif',

  // Sans-Serif Fonts
  arial: 'Arial, Helvetica, sans-serif',
  'arial-black': '"Arial Black", Gadget, sans-serif',
  comic: '"Comic Sans MS", cursive, sans-serif',
  impact: 'Impact, Charcoal, sans-serif',
  lucida: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
  tahoma: 'Tahoma, Geneva, sans-serif',
  trebuchet: '"Trebuchet MS", Helvetica, sans-serif',
  verdana: 'Verdana, Geneva, sans-serif',

  // Monospace Fonts
  courier: '"Courier New", Courier, monospace',
  'lucida-console': '"Lucida Console", Monaco, monospace',
};

export const getReadableFontName = (font: string) => font.split(',')[0].replace(/\"/g, '');

export const sortedFonts = Object.entries(fonts)
  .map(font => [...font, getReadableFontName(font[1])])
  .sort((a, b) => getReadableFontName(a[1]).localeCompare(getReadableFontName(b[1])));
