import { sendRequest } from './send-request';
import { APIPath, HTTPMethod } from './types';

const compressImage = async (image: File, format: string, compressionLevel: string) => {
  const formData = new FormData();

  formData.append('image', image);
  formData.append('format', format);
  formData.append('compressionLevel', compressionLevel);

  const response = await sendRequest(
    APIPath.Compress,
    HTTPMethod.POST,
    formData,
  );

  return response;
};

export { compressImage };
