// About Date and time
export { parseDate, parseTimeGap } from '@/utils/datetime';

// About character string
const getCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// 首字母大写
export const capitalize = (str: string, firstWordOnly: boolean) => {
  const words = str.split(' ');
  if (firstWordOnly) {
    words[0] = getCapitalize(words[0]);
  } else {
    for (const [i, word] of words.entries()) {
      words[i] = getCapitalize(word);
    }
  }
  return words.join(' ');
};

// Number short
export const numberShort = (number: number) => {
  return number >= 1000000
    ? `${Math.floor(number / 1000000)}m`
    : number >= 1000
    ? `${Math.floor(number / 1000)}k`
    : number;
};
