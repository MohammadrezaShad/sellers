import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Permission } from '@/common/permissions/permission-type';
import { PanelGuard } from '@/modules/auth/guards/panel.guard';
import { CreateReportInput, CreateReportOutput } from './dto/create-report.dto';
import {
  BulkDeleteReportInput,
  DeleteReportInput,
  DeleteReportOutput,
} from './dto/delete-report.dto';
import {
  FindManyReportsOutput,
  FindReportByIdInput,
  FindReportByIdsInput,
  FindReportOutput,
} from './dto/find-report.dto';
import { SearchReportInput, SearchReportOutput } from './dto/search-report.dto';
import { ReportMutation, ReportQuery } from './dto/report.dto';
import { UpdateReportInput, UpdateReportOutput } from './dto/update-report.dto';
import { BulkDeleteReportUseCase } from './use-case/bulk-delete-report.use-case';
import { CreateReportUseCase } from './use-case/create-report.use-case';
import { DeleteReportUseCase } from './use-case/delete-report.use-case';
import { FindReportByIdUseCase } from './use-case/find-report-by-id.use-case';
import { FindReportByIdsUseCase } from './use-case/find-report-by-ids.use-case';
import { SearchReportUseCase } from './use-case/search-report.use-case';
import { UpdateReportUseCase } from './use-case/update-report.use-case';
import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import { ReportEntity } from './entity/report.entity';
import { SellerEntity } from '../seller/entity/seller.entity';
import { FindSellerByIdUseCase } from '../seller/use-case/find-seller-by-id.use-case';
import { UploadFileOutput } from './dto/upload-file.dto';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CoreOutput } from '@/common/dtos/output.dto';
import { UploadFileUseCase } from './use-case/upload-file.use-case';
import { CreateReportFromStaticExcelUseCase } from './use-case/create-report-from-static-excel.use-case';

@Resolver(() => ReportQuery)
export class ReportQueryResolver {
  constructor(
    private readonly searchReportUseCase: SearchReportUseCase,
    private readonly findReportByIdUseCase: FindReportByIdUseCase,
    private readonly findReportByIdsUseCase: FindReportByIdsUseCase,
  ) {}

  @Query(() => ReportQuery)
  async report() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindReportOutput)
  async findReportById(
    @Args('input') input: FindReportByIdInput,
  ): Promise<FindReportOutput> {
    return this.findReportByIdUseCase.findReportByid(input);
  }

  @ResolveField(() => FindManyReportsOutput)
  async findReportByIds(
    @Args('input') input: FindReportByIdsInput,
  ): Promise<FindManyReportsOutput> {
    return this.findReportByIdsUseCase.findReportByids(input);
  }

  @ResolveField(() => SearchReportOutput)
  async searchReports(
    @Args('input') input: SearchReportInput,
  ): Promise<SearchReportOutput> {
    return this.searchReportUseCase.search(input);
  }
}

@Resolver(() => ReportMutation)
export class ReportMutationResolver {
  constructor(
    private readonly createReportUseCase: CreateReportUseCase,
    private readonly updateReportUseCase: UpdateReportUseCase,
    private readonly deleteReportUseCase: DeleteReportUseCase,
    private readonly bulkDeleteReportUseCase: BulkDeleteReportUseCase,
    private readonly uploadFileUseCase: UploadFileUseCase,
    private readonly createReportFromStaticExcelUseCase: CreateReportFromStaticExcelUseCase,
  ) {}

  @Mutation(() => ReportMutation)
  async report() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateReportOutput)
  @PanelGuard<MethodDecorator>(Permission.CREATE_REPORT, Permission.CREATE)
  async createReport(
    @Args('input') input: CreateReportInput,
  ): Promise<CreateReportOutput> {
    return this.createReportUseCase.createReport(input);
  }

  @ResolveField(() => CreateReportOutput)
  // @PanelGuard<MethodDecorator>(Permission.CREATE_REPORT, Permission.CREATE)
  async createReportFromStaticExcel(): Promise<CreateReportOutput> {
    return this.createReportFromStaticExcelUseCase.createReport();
  }

  @ResolveField(() => UploadFileOutput)
  // @PanelGuard<MethodDecorator>(Permission.UPLOAD_IMAGE)
  async uploadFile(
    @Args('file', { type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<CoreOutput> {
    return this.uploadFileUseCase.uploadFile({ excelFile: file });
  }

  @ResolveField(() => UpdateReportOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_REPORT, Permission.UPDATE)
  async updateReport(
    @Args('input') input: UpdateReportInput,
  ): Promise<UpdateReportOutput> {
    return this.updateReportUseCase.updateReport(input);
  }

  @ResolveField(() => DeleteReportOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_REPORT, Permission.DELETE)
  async deleteReport(
    @Args('input') input: DeleteReportInput,
  ): Promise<DeleteReportOutput> {
    return this.deleteReportUseCase.deleteReport(input);
  }

  @ResolveField(() => DeleteReportOutput)
  @PanelGuard<MethodDecorator>(
    Permission.BULK_DELETE_REPORT,
    Permission.BULK_DELETE,
  )
  async bulkDeleteReport(
    @Args('input') input: BulkDeleteReportInput,
  ): Promise<DeleteReportOutput> {
    return this.bulkDeleteReportUseCase.bulkDeleteReport(input);
  }
}

@Resolver(() => ReportEntity)
export class ReportResolver {
  constructor(private readonly sellerUseCase: FindSellerByIdUseCase) {}
  @ResolveField(() => [SellerEntity], { nullable: true })
  async seller(@Parent() report: ReportEntity) {
    const seller = await this.sellerUseCase.findSellerByid({
      id: report.seller,
    });

    return seller;
  }
}

export const ReportResolvers = [
  ReportQueryResolver,
  ReportMutationResolver,
  ReportResolver,
];
