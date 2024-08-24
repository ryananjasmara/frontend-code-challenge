import { generateRandomImage } from './generateImage.util';

describe('generateRandomImage', () => {
  it('should return a valid image URI', () => {
    const imageUri = generateRandomImage();
    expect(imageUri).toMatch(
      /^https:\/\/dummyimage\.com\/300x300\/[0-9a-f]{6}\/[0-9a-f]{6}$/
    );
  });

  it('should return different URIs on subsequent calls', () => {
    const imageUri1 = generateRandomImage();
    const imageUri2 = generateRandomImage();
    expect(imageUri1).not.toBe(imageUri2);
  });

  it('should generate valid hex color codes for background and foreground', () => {
    const imageUri = generateRandomImage();
    const regex =
      /^https:\/\/dummyimage\.com\/300x300\/([0-9a-f]{6})\/([0-9a-f]{6})$/;
    const match = imageUri.match(regex);
    expect(match).not.toBeNull();
    if (match) {
      const [, background, foreground] = match;
      expect(background).toMatch(/^[0-9a-f]{6}$/);
      expect(foreground).toMatch(/^[0-9a-f]{6}$/);
    }
  });
});
