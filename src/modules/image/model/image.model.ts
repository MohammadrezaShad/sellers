import { AggregateRoot } from '@nestjs/cqrs';

import { UpdateImageInput } from '@/modules/image/dto/update-image.dto';

export class Image extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private alt: string | null,
    private fileName: string,
    private width: number,
    private height: number,
    private preview: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getAlt(): string | null {
    return this.alt;
  }

  getFileName(): string {
    return this.fileName;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getPreview(): string {
    return this.preview;
  }

  updateImage({ alt }: UpdateImageInput) {
    alt && (this.alt = alt);
  }
}
