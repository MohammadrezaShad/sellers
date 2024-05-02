import { BadRequestException, Injectable } from '@nestjs/common';

import { ReportRepository } from '../report.repository';
import { REPORT_ID_IS_NOT_CORRECT } from '../constant/error-message.constant';

@Injectable()
export class ReportHelepr {
  constructor(private readonly reportRepository: ReportRepository) {}

  async validateReportId(reportId: string) {
    const report = await this.reportRepository.findById({ id: reportId });
    if (!report || report === null)
      throw new BadRequestException(REPORT_ID_IS_NOT_CORRECT);
  }
}
