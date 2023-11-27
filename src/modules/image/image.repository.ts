import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { escapeRegex } from '@/common/utils/escape-regx.util';
import { SearchImagesInput } from '@/modules/image/dto/search-image.dto';
import { ImageEntity, TImage } from '@/modules/image/entity/image.entity';
import { ImageEntityFactory } from '@/modules/image/entity/image.factory';
import { Image } from '@/modules/image/model/image.model';

@Injectable()
export class ImageRepository {
  constructor(
    @InjectModel(ImageEntity.name)
    private readonly imageModel: Model<TImage>,
    private readonly imageEntityFactory: ImageEntityFactory,
  ) {}

  async create(input: Image): Promise<void> {
    const image = new this.imageModel(this.imageEntityFactory.create(input));
    await image.save();
  }

  async findById(id: string): Promise<Image | null> {
    const image = await this.imageModel.findById(id).exec();
    return image ? this.imageEntityFactory.createFromEntity(image) : null;
  }

  async findManyById(ids: string[]): Promise<Image[]> {
    const imageEntities = await this.imageModel
      .find({ _id: { $in: ids } })
      .exec();
    const images = imageEntities.map(ie =>
      this.imageEntityFactory.createFromEntity(ie),
    );
    return images || [];
  }

  async search({
    count: inputCount,
    page: inputPage,
    filename,
  }: SearchImagesInput): Promise<Image[]> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;
    const safeFilename = filename ? escapeRegex(filename) : filename;
    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(filename && {
            $or: [
              { $text: { $search: filename } },
              { filename: { $regex: safeFilename, $options: 'i' } },
            ],
          }),
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $facet: {
          results: [{ $skip: (page - 1) * count }, { $limit: count }],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ];
    const [searchData = {}] = await this.imageModel.aggregate(pipeline);

    const imageResult = searchData.results?.map(ie =>
      this.imageEntityFactory.createFromEntity(ie),
    );
    return imageResult;
  }

  async update(imageInput: Image): Promise<void> {
    const imageEntity = this.imageEntityFactory.create(imageInput);
    await this.imageModel
      .findOneAndReplace({ _id: imageInput.getId() }, imageEntity)
      .exec();
  }

  async delete(id: string): Promise<ImageEntity | null> {
    const image = await this.imageModel.findByIdAndDelete(id).exec();
    return image;
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.imageModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }
}
