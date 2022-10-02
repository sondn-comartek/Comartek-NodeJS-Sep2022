import { Processor } from '@nestjs/bull';
import { FileResizeHelper } from '../helpers/file-resize.helper';

@Processor('file-resize-processor')
export class FileResizeProcessor {
    constructor(private readonly fileResizeHelper: FileResizeHelper) {}
}
