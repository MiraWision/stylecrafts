import { sendRequest } from './send-request';
import { APIPath, HTTPMethod } from './types';

const optimizeImage = async (image: File, format: string, optimizationLevel: string) => {
  const formData = new FormData();

  formData.append('image', image);
  formData.append('format', format);
  formData.append('optimizationLevel', optimizationLevel);

  const response = await sendRequest(
    APIPath.Optimize,
    HTTPMethod.POST,
    formData,
  );

  return response;
};

export { optimizeImage };
