import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { resolve } from 'path';
import * as xlsx from 'xlsx';

import { CreateReportOutput } from '../dto/create-report.dto';
import { SellerModel } from '@/modules/seller/model/seller.model';
import { FindSellerByNameAndNationalNumberQuery } from '@/modules/seller/query/find-seller-by-name-and-national-number/find-seller-by-name-and-national-number.query';
import { FindSellerByNameAndBankAccountNumberQuery } from '@/modules/seller/query/find-seller-by-name-and-bank-account-number/find-seller-by-name-and-bank-account-number.query';

@Injectable()
export class CreateReportFromStaticExcelUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createReport(): Promise<CreateReportOutput> {
    try {
      const filePath = resolve('src', 'assets', 'tir.xlsx');
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(sheet);
      let num = 0;

      console.log(data);

      for (const it of data) {
        let name = it['نام بازاریاب'];
        let nationalNumber = it['کدملی'];
        let bankAccountNumber = it['شماره حساب'];
        let description = it['شرح سند'];
        let commission = it['مجموع کارمزد'];
        let netAmountAfterTaxDeduction = it['مبلغ خالص بعد از کسر مالیات'];

        const sellerWithNN: SellerModel = await this.queryBus.execute(
          new FindSellerByNameAndNationalNumberQuery(name, nationalNumber),
        );

        const sellerWithBA: SellerModel = await this.queryBus.execute(
          new FindSellerByNameAndBankAccountNumberQuery(
            name,
            bankAccountNumber,
          ),
        );
      }

      // await this.commandBus.execute(new CreateReportCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
