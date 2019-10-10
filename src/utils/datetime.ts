const wrongDateFormat = "Wrong date format, must be 'Date', 'string' or 'number'";

const dateFormatBefore = (date: Date | string | number) => {
  if (typeof date === 'string' && /^[0-9]+$/.test(date)) {
    date = parseInt(date);
  }

  if (typeof date === 'number' && date.toString().length === 10) {
    date = date * 1000;
  }

  return date;
};

export const parseDate = (date: Date | number | string, format: string = 'yyyy.MM.dd') => {
  if (!date) {
    return null;
  }

  date = dateFormatBefore(date);

  try {
    date = new Date(date);
  } catch {
    return wrongDateFormat;
  }

  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      date
        .getFullYear()
        .toString()
        .substr(4 - RegExp.$1.length)
    );
  }

  const o: { [key: string]: number } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(format)) {
      const str = o[k] + '';
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : `00${str}`.substr(str.length));
    }
  });

  return format;
};

export const parseTimeGap = (date: Date | string | number) => {
  if (!date) {
    return null;
  }

  date = dateFormatBefore(date);

  try {
    date = new Date(date);
  } catch {
    return wrongDateFormat;
  }

  const diff = (new Date().getTime() - date.getTime()) / 1000;

  if (diff < 60) return 'just now';
  else if (diff < 3600) return Math.floor(diff / 60) + ' minutes ago';
  else if (diff < 3600 * 24) return Math.floor(diff / 3600) + ' hours ago';
  else if (diff < 3600 * 24 * 30) return Math.floor(diff / 3600 / 24) + ' days ago';
  else if (diff < 3600 * 24 * 30 * 12) return Math.floor(diff / 3600 / 24 / 30) + ' months ago';
  else return Math.floor(diff / 3600 / 24 / 30 / 12) + ' years ago';
};
