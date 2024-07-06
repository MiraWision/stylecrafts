import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import formidable, { File, Files, Fields } from 'formidable';
import fs from 'fs';
import { promisify } from 'util';
import os from 'os';

export const config = {
  api: {
    bodyParser: false,
  },
};

type CompressionLevel = 'minimal' | 'optimal' | 'maximum';

const readFile = promisify(fs.readFile);

const QualitySettings: Record<CompressionLevel, any> = {
  minimal: {
    jpeg: { quality: 85, mozjpeg: false },
    png: { compressionLevel: 2 },
    webp: { quality: 85 },
    tiff: { quality: 85 },
    avif: { quality: 85 },
    heif: { quality: 85 }
  },
  optimal: {
    jpeg: { quality: 75, mozjpeg: true },
    png: { compressionLevel: 6 },
    webp: { quality: 75 },
    tiff: { quality: 75 },
    avif: { quality: 50 },
    heif: { quality: 50 }
  },
  maximum: {
    jpeg: { quality: 60, mozjpeg: true },
    png: { compressionLevel: 9 },
    webp: { quality: 60 },
    tiff: { quality: 60 },
    avif: { quality: 30 },
    heif: { quality: 30 }
  },
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
      image = image.gif();
      break;
    case 'avif':
      image = image.avif(selectedQuality.avif);
      break;
    case 'heif':
      image = image.heif(selectedQuality.heif);
      break;
    default:
      throw new Error('Unsupported format');
  }

  image = image.withMetadata({ exif: undefined });

  const compressdBuffer = await image.toBuffer();

  if (compressdBuffer.length >= buffer.length) {
    return buffer;
  }

  return compressdBuffer;
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
    const compressdBuffer = await compressImage(file, format, compressionLevel);
    
    const compressdImage = compressdBuffer.toString('base64');

    res.status(200).json({
      image: compressdImage,
      size: compressdBuffer.length,
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
