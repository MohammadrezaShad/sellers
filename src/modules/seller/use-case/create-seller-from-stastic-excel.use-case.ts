import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { resolve } from 'path';
import * as xlsx from 'xlsx';
import { CreateSellerCommand } from '../command/create-seller/create-seller.command';
import { CreateSellerOutput } from '../dto/create-seller.dto';
import { SellerModel } from '../model/seller.model';
import { FindSellerByNameAndNationalNumberQuery } from '../query/find-seller-by-name-and-national-number/find-seller-by-name-and-national-number.query';

@Injectable()
export class CreateSellerFromStaticExcelUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createSeller(): Promise<CreateSellerOutput> {
    try {
      const filesName = [
        'ab1400.xlsx',
        'ab1400-2.xlsx',
        'ab1401.xlsx',
        'ab1401-2.xlsx',
        'ab1402.xlsx',
        'ab1402-2.xlsx',
        'az1400.xlsx',
        'az1400-2.xlsx',
        'az1401.xlsx',
        'az1401-2.xlsx',
        'az1402.xlsx',
        'b1400.xlsx',
        'b1400-2.xlsx',
        'b1401.xlsx',
        'b1401-2.xlsx',
        'd1400.xlsx',
        'd1400-2.xlsx',
        'd1401.xlsx',
        'd1401-2.xlsx',
        'e1400.xlsx',
        'e1400-2.xlsx',
        'e1401.xlsx',
        'e1401-2.xlsx',
        'f1401.xlsx',
        'f1401-2.xlsx',
        'f1402.xlsx',
        'f1402-2.xlsx',
        'kh1401.xlsx',
        'kh1401-2.xlsx',
        'kh1402.xlsx',
        'kh1402-2.xlsx',
        'me1400.xlsx',
        'me1400-2.xlsx',
        'me1401.xlsx',
        'me1401-2.xlsx',
        'me1402.xlsx',
        'me1402-2.xlsx',
        'mo1401.xlsx',
        'mo1401-2.xlsx',
        'mo1402.xlsx',
        'mo1402-2.xlsx',
        'o1401.xlsx',
        'o1401-2.xlsx',
        'o1402.xlsx',
        'o1402-2.xlsx',
        'sh1400.xlsx',
        'sh1400-2.xlsx',
        'sh1401.xlsx',
        'sh1401-2.xlsx',
        'sh1402.xlsx',
        'sh1402-2.xlsx',
        't1401.xlsx',
        't1401-2.xlsx',
        't1402.xlsx',
        't1402-2.xlsx',
      ];
      const headers = [
        'جمع کارمزد بعد از کسر ابطال و بازخرید و سپرده تامین اجتماعی',
        '',
        'سپرده تامین اجتماعی',
        'جمع کارمزد پس از کسر ابطال و بازخرید',
        '',
        '',
        'بدهی ابطال و بازخرید',
        '',
        '',
        '',
        'مجموع کارمزد',
        'کارمزد تکمیلی',
        '',
        '',
        'کارمزد عمر',
        '',
        'حق بیمه',
        '',
        '',
        'حق بیمه تکمیلی',
        'حق بیمه عمر',
        'درصد',
        'کدملی',
        '',
        'نام بازاریاب',
        'کدبازاریاب',
        'کد نماینده',
      ];
      let num = 0;
      for (const file of filesName) {
        const filePath = resolve('src', 'assets', file);
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        // const data = xlsx.utils.sheet_to_json(sheet);
        const data = xlsx.utils.sheet_to_json(sheet, {
          header: headers,
        });

        for (const it of data) {
          let name = it['نام بازاریاب'];
          let marketerCode = it['کدبازاریاب'];
          let nationalNumber = it['کدملی'];

          const sellerWithNN: SellerModel = await this.queryBus.execute(
            new FindSellerByNameAndNationalNumberQuery(name, nationalNumber),
          );

          if (
            !sellerWithNN &&
            name !== '' &&
            name !== undefined &&
            name !== 'نام بازاریاب'
          ) {
            num++;

            await this.commandBus.execute(
              new CreateSellerCommand({
                name: name,
                marketerCode: marketerCode,
                nationalNumber: nationalNumber,
              }),
            );
          }
          name = '';
          marketerCode = '';
          nationalNumber = '';
        }
      }
      console.log(`${num} seller added to databse.`);
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
