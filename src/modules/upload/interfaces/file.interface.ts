import { Stream } from 'stream';

export class FileInterface {
  mimetype: string;
  createReadStream: () => Stream;
}
