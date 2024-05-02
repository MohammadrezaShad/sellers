import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { escapeRegex } from '@/common/utils/escape-regx.util';
import { DeleteCommissionInput } from './dto/delete-commission.dto';
import {
  FindCommissionByIdInput,
  FindCommissionByIdsInput,
} from './dto/find-commission.dto';
import {
  SearchCommissionInput,
  SearchCommissionOutput,
} from './dto/search-commission.dto';
import { UpdateCommissionInput } from './dto/update-commission.dto';
import {
  CommissionEntity,
  TCommissionEntity,
} from './entity/commission.entity';
import { CommissionEntityFactory } from './entity/commission.factory';
import { CommissionModel } from './model/Commission.model';

@Injectable()
export class CommissionRepository {
  constructor(
    @InjectModel(CommissionEntity.name)
    private readonly commissionModel: Model<TCommissionEntity>,
    private readonly commissionFactory: CommissionEntityFactory,
  ) {}

  public async findById({
    id,
  }: FindCommissionByIdInput): Promise<CommissionModel | null> {
    const commission = await this.commissionModel.findById(id).exec();
    return this.commissionFactory.createFromEntity(commission);
  }

  async findManyById({
    ids,
  }: FindCommissionByIdsInput): Promise<CommissionModel[]> {
    const commissions: CommissionEntity[] = await this.commissionModel
      .find({ _id: { $in: ids } })
      .exec();

    const commissionModel: CommissionModel[] = [];
    commissions.map(it => {
      commissionModel.push(this.commissionFactory.createFromEntity(it));
    });

    return commissionModel;
  }

  async search({
    count: inputCount,
    page: inputPage,
  }: SearchCommissionInput): Promise<SearchCommissionOutput> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;

    const searchResults = await this.commissionModel.aggregate([
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

  public async create(input: CommissionModel): Promise<void> {
    const commission = new this.commissionModel(
      this.commissionFactory.create(input),
    );
    await commission.save();
  }

  public async update({
    commissionId,
    ...restOfArgs
  }: UpdateCommissionInput): Promise<void> {
    await this.commissionModel
      .findByIdAndUpdate(commissionId, { ...restOfArgs }, { new: true })
      .exec();
  }

  public async delete({
    commissionId: sellerId,
  }: DeleteCommissionInput): Promise<void> {
    await this.commissionModel.findByIdAndDelete(sellerId).exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.commissionModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }
}
