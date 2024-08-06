import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import formidable, { File, Files, Fields } from 'formidable';
import fs from 'fs';
import { promisify } from 'util';
import os from 'os';
import { execFile } from 'child_process';
import gifsicle from 'gifsicle';

export const config = {
  api: {
    bodyParser: false,
  },
};

type CompressionLevel = 'minimal' | 'optimal' | 'maximum';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const QualitySettings: Record<CompressionLevel, any> = {
  minimal: {
    jpeg: { quality: 85, mozjpeg: false },
    png: { compressionLevel: 2 },
    webp: { quality: 85 },
    tiff: { quality: 85 },
    avif: { quality: 85 },
    heif: { quality: 85, compression: 'av1' },
    gif: { optimizationLevel: 1, colors: 256 }
  },
  optimal: {
    jpeg: { quality: 75, mozjpeg: true },
    png: { compressionLevel: 6 },
    webp: { quality: 75 },
    tiff: { quality: 75 },
    avif: { quality: 50 },
    heif: { quality: 50, compression: 'av1' },
    gif: { optimizationLevel: 3, colors: 128 } 
  },
  maximum: {
    jpeg: { quality: 60, mozjpeg: true },
    png: { compressionLevel: 9 },
    webp: { quality: 60 },
    tiff: { quality: 60 },
    avif: { quality: 30 },
    heif: { quality: 30, compression: 'av1' }, 
    gif: { optimizationLevel: 5, colors: 64, lossy: 80 } 
  },
};

const compressGif = async (inputPath: string, outputPath: string, optimizationLevel: number, colors: number, lossy?: number) => {
  const args = ['--optimize=' + optimizationLevel, '--colors', colors.toString(), '-o', outputPath, inputPath];
  if (lossy) {
    args.push('--lossy=' + lossy);
  }
  return new Promise<void>((resolve, reject) => {
    execFile(gifsicle, args, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

const compressImage = async (file: File, format: string, compressionLevel: CompressionLevel) => {
  const buffer = await readFile(file.filepath);

  let image = sharp(buffer).withMetadata({ orientation: undefined, density: undefined });

  const selectedQuality = QualitySettings[compressionLevel];

  switch (format.split('/')[1]) {
    case 'jpeg':
    case 'jpg':
      image = image.jpeg(selectedQuality.jpeg);
      break;
    case 'png':
      image = image.png(selectedQuality.png);
      break;
    case 'webp':
      image = image.webp(selectedQuality.webp);
      break;
    case 'tiff':
      image = image.tiff(selectedQuality.tiff);
      break;
    case 'gif':
      const tempInputPath = file.filepath;
      const tempOutputPath = `${file.filepath}-compressed.gif`;
      await compressGif(tempInputPath, tempOutputPath, selectedQuality.gif.optimizationLevel, selectedQuality.gif.colors, selectedQuality.gif.lossy);
      const compressedGifBuffer = await readFile(tempOutputPath);
      await unlink(tempOutputPath); // Удалить временный сжатый файл
      return compressedGifBuffer;
    case 'avif':
      image = image.avif(selectedQuality.avif);
      break;
    case 'heif':
      image = image.heif({ quality: selectedQuality.heif.quality, compression: selectedQuality.heif.compression });
      break;
    default:
      throw new Error('Unsupported format');
  }

  image = image.withMetadata({ exif: undefined });

  const compressedBuffer = await image.toBuffer();

  if (compressedBuffer.length >= buffer.length) {
    return buffer;
  }

  return compressedBuffer;
};

const getParams = (fields: Fields, files: Files): { file: File, format: string, compressionLevel: CompressionLevel } => {
  const file = Array.isArray(files.image) 
    ? files.image[0] 
    : files.image;

  const format = Array.isArray(fields.format)
    ? fields.format[0]
    : fields.format ?? 'image/jpeg';
  
  const compressionLevel = (Array.isArray(fields.compressionLevel) 
    ? fields.compressionLevel[0] 
    : fields.compressionLevel ?? 'optimal') as CompressionLevel;

  if (!file || typeof file.filepath !== 'string') {
    throw new Error('Invalid input');
  }

  return { file, format, compressionLevel };
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ uploadDir: os.tmpdir(), keepExtensions: true });

  const { fields, files } = await new Promise<{ fields: Fields, files: Files }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });

  const { file, format, compressionLevel } = getParams(fields, files);

  try {
    const compressedBuffer = await compressImage(file, format, compressionLevel);
    
    const compressedImage = compressedBuffer.toString('base64');

    res.status(200).json({
      image: compressedImage,
      size: compressedBuffer.length,
    });
  } catch (error) {
    console.error('Error compressing image:', error);

    res.status(500).json({ error: 'Error compressing image' });
  } finally {
    fs.unlink(file.filepath, (err) => {
      if (err) console.error(`Failed to delete temporary file: ${file.filepath}`);
    });
  }
}

export default handler;