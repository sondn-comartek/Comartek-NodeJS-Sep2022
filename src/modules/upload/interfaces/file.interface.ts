import { Stream } from 'stream';

export class FileInterface {
  filename: string;
  mimetype: string;
  createReadStream: () => Stream;
}
