import { Environments } from './../environments/index';
import { v2 as cloudinary } from 'cloudinary';

export default cloudinary.config({
  cloud_name: Environments.CloudName,
  api_key: Environments.CloudApiKey,
  api_secret: Environments.CloudApiSecret,
});
