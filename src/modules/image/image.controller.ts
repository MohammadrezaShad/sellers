import { Controller, Get, Header, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { ServeImageUseCase } from '@/modules/image/use-case/serve-image.use-case';

@Controller('images')
export class ImageController {
  constructor(private readonly serveImageUseCase: ServeImageUseCase) {}

  @Get(':id')
  @Header('Cache-Control', 'public, max-age=86400, s-maxage=31536000')
  @Header('Content-Type', 'image/webp')
  async serveImage(
    @Res() response: Response,
    @Param('id') id: string,
    @Query('w') w?: number,
    @Query('q') q?: number,
  ) {
    return this.serveImageUseCase.serveImage({
      id,
      width: w ? +w : w,
      quality: q ? +q : q,
      response,
    });
  }
}
