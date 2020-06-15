export const parseURL = (url: string) => {
  const search = url.split('?')[1];
  return search
    ? JSON.parse(
        '{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
      )
    : {};
};
