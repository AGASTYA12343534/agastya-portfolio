/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const path = require('path');

const inputPath = "C:\\Users\\Agastya\\.gemini\\antigravity-ide\\brain\\4dc8c4f0-f0b6-4bd0-868c-7e0464dfbc20\\media__1786101424920.jpg";
const outputPath = path.join(__dirname, 'public', 'profile.webp');

sharp(inputPath)
  .resize({
    width: 800,
    height: 800,
    fit: sharp.fit.cover,
    position: sharp.strategy.attention // Focus on face/subject
  })
  .webp({ quality: 80 })
  .toFile(outputPath)
  .then(() => console.log('Successfully cropped and saved to', outputPath))
  .catch(err => console.error('Error cropping image:', err));
