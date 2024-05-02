import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';
import { ReportModel } from './report.model';
import { ReportRepository } from '../report.repository';
import { CreateReportInput } from '../dto/create-report.dto';

@Injectable()
export class ReportModelFactory implements ModelFactory<ReportModel> {
  constructor(private readonly reportRepository: ReportRepository) {}

  async create({
    seller,
    description,
    commission,
    netAmountAfterTaxDeduction,
  }: CreateReportInput): Promise<ReportModel> {
    const report = new ReportModel(
      new ObjectId().toHexString(),
      seller,
      description,
      commission,
      netAmountAfterTaxDeduction,
    );
    await this.reportRepository.create(report);
    return report;
  }
}
