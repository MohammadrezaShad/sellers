import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { escapeRegex } from '@/common/utils/escape-regx.util';
import { DeleteReportInput } from './dto/delete-report.dto';
import {
  FindReportByIdInput,
  FindReportByIdsInput,
} from './dto/find-report.dto';
import { SearchReportInput, SearchReportOutput } from './dto/search-report.dto';
import { UpdateReportInput } from './dto/update-report.dto';
import { ReportEntity, TReportEntity } from './entity/report.entity';
import { ReportEntityFactory } from './entity/report.factory';
import { ReportModel } from './model/report.model';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectModel(ReportEntity.name)
    private readonly reportModel: Model<TReportEntity>,
    private readonly reportFactory: ReportEntityFactory,
  ) {}

  public async findById({
    id,
  }: FindReportByIdInput): Promise<ReportModel | null> {
    const report = await this.reportModel.findById(id).exec();
    return this.reportFactory.createFromEntity(report);
  }

  async findManyById({ ids }: FindReportByIdsInput): Promise<ReportModel[]> {
    const reports: ReportEntity[] = await this.reportModel
      .find({ _id: { $in: ids } })
      .exec();

    const reportModel: ReportModel[] = [];
    reports.map(it => {
      reportModel.push(this.reportFactory.createFromEntity(it));
    });

    return reportModel;
  }

  public async findByName(name: string): Promise<ReportModel | null> {
    const report = await this.reportModel.findOne({ name: name }).exec();
    return this.reportFactory.createFromEntity(report);
  }

  public async findOneItemByName(
    name: string,
    id: string | null,
  ): Promise<ReportModel | null> {
    const report = await this.reportModel.findOne({
      $and: [{ name: name }, { _id: { $ne: id } }],
    });
    return this.reportFactory.createFromEntity(report);
  }

  public async findOneItemByTitle(
    title: string,
    id: string | null,
  ): Promise<ReportModel | null> {
    const report = await this.reportModel.findOne({
      $and: [{ title: title }, { _id: { $ne: id } }],
    });
    return this.reportFactory.createFromEntity(report);
  }

  async search({
    count: inputCount,
    page: inputPage,
    text,
  }: SearchReportInput): Promise<SearchReportOutput> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;

    const safeText = text ? escapeRegex(text) : text;

    const searchResults = await this.reportModel.aggregate([
      {
        $match: {
          ...(text && {
            $or: [{ $text: { $search: text } }, { name: { $regex: safeText } }],
          }),
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

  public async create(reportInput: ReportModel): Promise<void> {
    const report = new this.reportModel(this.reportFactory.create(reportInput));
    await report.save();
  }

  public async update({
    reportId,
    ...restOfArgs
  }: UpdateReportInput): Promise<void> {
    await this.reportModel
      .findByIdAndUpdate(reportId, { ...restOfArgs }, { new: true })
      .exec();
  }

  public async delete({ reportId }: DeleteReportInput): Promise<void> {
    await this.reportModel.findByIdAndDelete(reportId).exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.reportModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }
}
