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

const readFile = promisify(fs.readFile);

interface OptimizationOptions {
  quality?: number;
  compressionLevel?: number;
  width?: number;
  height?: number;
  fit?: keyof sharp.FitEnum;
  stripMetadata?: boolean;
}

const optimizeImage = async (file: File, format: string, options: OptimizationOptions) => {
  const buffer = await readFile(file.filepath);
  let image = sharp(buffer);

  if (options.width || options.height) {
    image = image.resize(options.width, options.height, {
      fit: options.fit || 'cover',
    });
  }

  switch (format) {
    case 'jpeg':
    case 'jpg':
      image = image.jpeg({ quality: options.quality || 80, mozjpeg: true });
      break;
    case 'png':
      image = image.png({ compressionLevel: options.compressionLevel || 9 });
      break;
    case 'webp':
      image = image.webp({ quality: options.quality || 80 });
      break;
    case 'tiff':
      image = image.tiff({ quality: options.quality || 80 });
      break;
    default:
      throw new Error('Unsupported format');
  }

  if (options.stripMetadata) {
    image = image.withMetadata({ exif: undefined });
  }

  const optimizedBuffer = await image.toBuffer();
  return optimizedBuffer;
};

const optimizationPresets: { [key: string]: OptimizationOptions } = {
  minimal: { quality: 90, compressionLevel: 3 },
  optimal: { quality: 80, compressionLevel: 6 },
  maximum: { quality: 70, compressionLevel: 9 },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = formidable({ uploadDir: os.tmpdir(), keepExtensions: true });

    form.parse(req, async (err, fields: Fields, files: Files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'Error parsing form' });
      }

      const format = Array.isArray(fields.format) ? fields.format[0] : fields.format;
      const optimizationLevel = Array.isArray(fields.optimizationLevel) ? fields.optimizationLevel[0] : fields.optimizationLevel || 'optimal';
      const file = Array.isArray(files.image) ? files.image[0] : files.image;

      if (!format || typeof format !== 'string' || !file || typeof file.filepath !== 'string') {
        console.error('Invalid input:', { format, file });
        return res.status(400).json({ error: 'Invalid input' });
      }

      console.log('Processing file:', file.filepath, 'with format:', format);

      const options = optimizationPresets[optimizationLevel];
      options.stripMetadata = Array.isArray(fields.stripMetadata) ? fields.stripMetadata[0] === 'true' : fields.stripMetadata === 'true';

      try {
        const originalBuffer = await readFile(file.filepath);
        console.log('Original image size:', originalBuffer.length);

        const optimizedBuffer = await optimizeImage(file, format, options);
        const originalSize = originalBuffer.length;
        const optimizedSize = optimizedBuffer.length;
        const reductionPercentage = ((originalSize - optimizedSize) / originalSize) * 100;

        res.status(200).json({
          optimizedImage: optimizedBuffer.toString('base64'),
          originalSize,
          optimizedSize,
          reductionPercentage,
        });
      } catch (error) {
        console.error('Error optimizing image:', error);
        res.status(500).json({ error: 'Error optimizing image' });
      } finally {
        fs.unlink(file.filepath, (err) => {
          if (err) console.error(`Failed to delete temporary file: ${file.filepath}`);
        });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
