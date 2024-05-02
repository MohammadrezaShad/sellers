import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { escapeRegex } from '@/common/utils/escape-regx.util';
import { DeleteSellerInput } from './dto/delete-seller.dto';
import {
  FindSellerByIdInput,
  FindSellerByIdsInput,
} from './dto/find-seller.dto';
import { SearchSellerInput, SearchSellerOutput } from './dto/search-seller.dto';
import { UpdateSellerInput } from './dto/update-seller.dto';
import { SellerEntity, TSellerEntity } from './entity/seller.entity';
import { SellerEntityFactory } from './entity/seller.factory';
import { SellerModel } from './model/seller.model';

@Injectable()
export class SellerRepository {
  constructor(
    @InjectModel(SellerEntity.name)
    private readonly sellerModel: Model<TSellerEntity>,
    private readonly sellerFactory: SellerEntityFactory,
  ) {}

  public async findById({
    id,
  }: FindSellerByIdInput): Promise<SellerModel | null> {
    const seller = await this.sellerModel.findById(id).exec();
    return this.sellerFactory.createFromEntity(seller);
  }

  async findManyById({ ids }: FindSellerByIdsInput): Promise<SellerModel[]> {
    const sellers: SellerEntity[] = await this.sellerModel
      .find({ _id: { $in: ids } })
      .exec();

    const sellerModel: SellerModel[] = [];
    sellers.map(it => {
      sellerModel.push(this.sellerFactory.createFromEntity(it));
    });

    return sellerModel;
  }

  public async findByName(name: string): Promise<SellerModel | null> {
    const seller = await this.sellerModel.findOne({ name: name }).exec();
    return this.sellerFactory.createFromEntity(seller);
  }

  public async findByNameAndNationalNumber(
    name: string,
    nationalNumber: string,
  ): Promise<SellerModel | null> {
    const seller = await this.sellerModel
      .findOne({ $and: [{ name: name }, { nationalNumber: nationalNumber }] })
      .exec();
    return this.sellerFactory.createFromEntity(seller);
  }

  public async findByNameAndBankAccountNumber(
    name: string,
    bankAccountNumber: string,
  ): Promise<SellerModel | null> {
    const seller = await this.sellerModel
      .findOne({
        $and: [{ name: name }, { bankAccountNumber: bankAccountNumber }],
      })
      .exec();
    return this.sellerFactory.createFromEntity(seller);
  }

  public async findOneItemByName(
    name: string,
    id: string | null,
  ): Promise<SellerModel | null> {
    const seller = await this.sellerModel.findOne({
      $and: [{ name: name }, { _id: { $ne: id } }],
    });
    return this.sellerFactory.createFromEntity(seller);
  }

  async search({
    count: inputCount,
    page: inputPage,
    text,
    nationalNumber,
    bankAccountNumber,
  }: SearchSellerInput): Promise<SearchSellerOutput> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;

    const safeText = text ? escapeRegex(text) : text;

    const searchResults = await this.sellerModel.aggregate([
      {
        $match: {
          ...(text && {
            $or: [{ $text: { $search: text } }, { name: { $regex: safeText } }],
          }),
          ...(nationalNumber && { nationalNumber: nationalNumber }),
          ...(bankAccountNumber && { bankAccountNumber: bankAccountNumber }),
        },
      },
      {
        $sort: { _id: -1 },
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
    ]);
    const [finalResults = {}] = searchResults;
    const totalCount = finalResults.totalCount?.[0]?.count || 0;

    return {
      success: true,
      results: finalResults.results,
      totalCount,
      totalPages: Math.ceil(totalCount / inputCount),
    };
  }

  public async create(sellerInput: SellerModel): Promise<void> {
    const seller = new this.sellerModel(this.sellerFactory.create(sellerInput));
    await seller.save();
  }

  public async update({
    sellerId,
    ...restOfArgs
  }: UpdateSellerInput): Promise<void> {
    await this.sellerModel
      .findByIdAndUpdate(sellerId, { ...restOfArgs }, { new: true })
      .exec();
  }

  public async delete({ sellerId }: DeleteSellerInput): Promise<void> {
    await this.sellerModel.findByIdAndDelete(sellerId).exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.sellerModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }
}
