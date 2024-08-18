export const hyfenize = (text: string) => {
  return text
    .replaceAll(" ", "-")
    .toLowerCase()
    .replaceAll(/[^A-Za-z0-9-]+/g, "");
};

export const unhyfenize = (text: string) => {
  return text.replaceAll("-", " ");
};
