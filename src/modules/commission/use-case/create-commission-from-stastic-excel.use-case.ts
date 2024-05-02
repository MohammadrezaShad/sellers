import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { resolve } from 'path';
import * as xlsx from 'xlsx';
import { CreateCommissionCommand } from '../command/create-commission/create-commission.command';
import { CreateCommissionOutput } from '../dto/create-commission.dto';
import { FindSellerByNameAndNationalNumberQuery } from '@/modules/seller/query/find-seller-by-name-and-national-number/find-seller-by-name-and-national-number.query';
import { SellerModel } from '@/modules/seller/model/seller.model';

@Injectable()
export class CreateCommissionFromStaticExcelUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createCommission(): Promise<CreateCommissionOutput> {
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
        const data = xlsx.utils.sheet_to_json(sheet, {
          header: headers,
        });
        for (const it of data) {
          let name = it['نام بازاریاب'];
          let nationalNumber = it['کدملی'];
          let percent = it['درصد'];
          let lifeInsurancePremium = it['حق بیمه عمر'];
          let additionalInsurancePremium = it['حق بیمه تکمیلی'];
          let insurancePremium = it['حق بیمه'];
          let lifeInsuranceCommission = it['کارمزد عمر'];
          let additionalInsuranceCommission = it['کارمزد تکمیلی'];
          let totalCommission = it['مجموع کارمزد'];
          let debt = it['بدهی ابطال و بازخرید'];
          let totalCommssionAfterDeductingDebt =
            it['جمع کارمزد پس از کسر ابطال و بازخرید'];
          let depositTaminEjtemaei = it['سپرده تامین اجتماعی'];
          let totalCommssionAfterDeductingDebtAndDepositTaminEjtemaei =
            it['جمع کارمزد بعد از کسر ابطال و بازخرید و سپرده تامین اجتماعی'];

          const sellerWithNN: SellerModel = await this.queryBus.execute(
            new FindSellerByNameAndNationalNumberQuery(name, nationalNumber),
          );

          if (name !== '' && name !== undefined && name !== 'نام بازاریاب') {
            num++;
            await this.commandBus.execute(
              new CreateCommissionCommand({
                seller: sellerWithNN.getId(),
                percent: percent,
                lifeInsurancePremium: lifeInsurancePremium,
                additionalInsurancePremium: additionalInsurancePremium,
                insurancePremium: insurancePremium,
                lifeInsuranceCommission: lifeInsuranceCommission,
                additionalInsuranceCommission: additionalInsuranceCommission,
                debt: debt,
                totalCommssionAfterDeductingDebt:
                  totalCommssionAfterDeductingDebt,
                depositTaminEjtemaei: depositTaminEjtemaei,
                totalCommssionAfterDeductingDebtAndDepositTaminEjtemaei:
                  totalCommssionAfterDeductingDebtAndDepositTaminEjtemaei,
                date: this.createDate(file),
              }),
            );
          }
          name = '';
          nationalNumber = '';
          percent = '';
          lifeInsurancePremium = '';
          additionalInsurancePremium = '';
          insurancePremium = '';
          lifeInsuranceCommission = '';
          additionalInsuranceCommission = '';
          totalCommission = '';
          debt = '';
          totalCommssionAfterDeductingDebt = '';
          depositTaminEjtemaei = '';
          totalCommssionAfterDeductingDebtAndDepositTaminEjtemaei = '';
        }
      }
      console.log(`${num} commission added to databse.`);
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  createDate(fileName: string): string {
    let date = '';
    switch (fileName) {
      case 'ab1400.xlsx':
        date = 'آبان 1400';
        break;
      case 'ab1400-2.xlsx':
        date = 'آبان 1400';
        break;
      case 'ab1401.xlsx':
        date = 'آبان 1401';
        break;
      case 'ab1401-2.xlsx':
        date = 'آبان 1401';
        break;
      case 'ab1402.xlsx':
        date = 'آبان 1402';
        break;
      case 'ab1402-2.xlsx':
        date = 'آبان 1402';
        break;
      //...
      case 'az1400.xlsx':
        date = 'آذر 1400';
        break;
      case 'az1400-2.xlsx':
        date = 'آذر 1400';
        break;
      case 'az1401.xlsx':
        date = 'آذر 1401';
        break;
      case 'az1401-2.xlsx':
        date = 'آذر 1401';
        break;
      case 'az1402.xlsx':
        date = 'آذر 1402';
        break;
      //...
      case 'b1400.xlsx':
        date = 'بهمن 1400';
        break;
      case 'b1400-2.xlsx':
        date = 'بهمن 1400';
        break;
      case 'b1401.xlsx':
        date = 'بهمن 1401';
        break;
      case 'b1401-2.xlsx':
        date = 'بهمن 1401';
        break;
      //...
      case 'd1400.xlsx':
        date = 'دی 1400';
        break;
      case 'd1400-2.xlsx':
        date = 'دی 1400';
        break;
      case 'd1401.xlsx':
        date = 'دی 1401';
        break;
      case 'd1401-2.xlsx':
        date = 'دی 1401';
        break;
      //...
      case 'e1400.xlsx':
        date = 'اسفند 1400';
        break;
      case 'e1400-2.xlsx':
        date = 'اسفند 1400';
        break;
      case 'e1401.xlsx':
        date = 'اسفند 1401';
        break;
      case 'e1401-2.xlsx':
        date = 'اسفند 1401';
        break;
      //...
      case 'f1401.xlsx':
        date = 'فروردین 1401';
        break;
      case 'f1401-2.xlsx':
        date = 'فروردین 1401';
        break;
      case 'f1402.xlsx':
        date = 'فروردین 1402';
        break;
      case 'f1402-2.xlsx':
        date = 'فروردین 1402';
        break;
      //...
      case 'kh1401.xlsx':
        date = 'خرداد 1401';
        break;
      case 'kh1401-2.xlsx':
        date = 'خرداد 1401';
        break;
      case 'kh1402.xlsx':
        date = 'خرداد 1402';
        break;
      case 'kh1402-2.xlsx':
        date = 'خرداد 1402';
        break;
      //...
      case 'me1400.xlsx':
        date = 'مهر 1400';
        break;
      case 'me1400-2.xlsx':
        date = 'مهر 1400';
        break;
      case 'me1401.xlsx':
        date = 'مهر 1401';
        break;
      case 'me1401-2.xlsx':
        date = 'مهر 1401';
        break;
      case 'me1402.xlsx':
        date = 'مهر 1402';
        break;
      case 'me1402-2.xlsx':
        date = 'مهر 1402';
        break;
      //...
      case 'mo1401.xlsx':
        date = 'مرداد 1401';
        break;
      case 'mo1401-2.xlsx':
        date = 'مرداد 1401';
        break;
      case 'mo1402.xlsx':
        date = 'مرداد 1402';
        break;
      case 'mo1402-2.xlsx':
        date = 'مرداد 1402';
        break;
      //...
      case 'o1401.xlsx':
        date = 'اردیبهشت 1401';
        break;
      case 'o1401-2.xlsx':
        date = 'اردیبهشت 1401';
        break;
      case 'o1402.xlsx':
        date = 'اردیبهشت 1402';
        break;
      case 'o1402-2.xlsx':
        date = 'اردیبهشت 1402';
        break;
      //...
      case 'sh1400.xlsx':
        date = 'شهریور 1400';
        break;
      case 'sh1400-2.xlsx':
        date = 'شهریور 1400';
        break;
      case 'sh1401.xlsx':
        date = 'شهریور 1401';
        break;
      case 'sh1401-2.xlsx':
        date = 'شهریور 1401';
        break;
      case 'sh1402.xlsx':
        date = 'شهریور 1402';
        break;
      case 'sh1402-2.xlsx':
        date = 'شهریور 1402';
        break;
      //...
      case 't1401.xlsx':
        date = 'تیر 1401';
        break;
      case 't1401-2.xlsx':
        date = 'تیر 1401';
        break;
      case 't1402.xlsx':
        date = 'تیر 1402';
        break;
      case 't1402-2.xlsx':
        date = 'تیر 1402';
        break;
    }
    return date;
  }
}
