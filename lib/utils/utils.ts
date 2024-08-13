export const hyfenize = (text: string) => {
  return text.replaceAll(" ", "-").toLowerCase();
};

export const unhyfenize = (text: string) => {
  return text.replaceAll("-", " ");
};
