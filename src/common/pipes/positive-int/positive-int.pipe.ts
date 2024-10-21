import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ParseIntPipe,
} from '@nestjs/common';

@Injectable()
export class PositiveIntPipe extends ParseIntPipe {
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const parseInt = await super.transform(value, metadata);

    if (parseInt < 0) {
      throw new BadRequestException();
    }

    return parseInt;
  }
}
