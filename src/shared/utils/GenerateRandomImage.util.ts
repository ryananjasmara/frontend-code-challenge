// Will return a random image uri with random background and foreground color
export const generateRandomImage = () => {
  const background = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  const foreground = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  const generatedImageUri = `https://dummyimage.com/300x300/${background}/${foreground}`;

  return generatedImageUri;
};
