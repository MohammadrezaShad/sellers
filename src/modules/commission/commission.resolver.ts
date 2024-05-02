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
import {
  CreateCommissionInput,
  CreateCommissionOutput,
} from './dto/create-commission.dto';
import {
  BulkDeleteCommissionInput,
  DeleteCommissionInput,
  DeleteCommissionOutput,
} from './dto/delete-commission.dto';
import {
  FindManyCommissionsOutput,
  FindCommissionByIdInput,
  FindCommissionByIdsInput,
  FindCommissionOutput,
} from './dto/find-commission.dto';
import {
  SearchCommissionInput,
  SearchCommissionOutput,
} from './dto/search-commission.dto';
import { CommissionMutation, CommissionQuery } from './dto/commission.dto';
import {
  UpdateCommissionInput,
  UpdateCommissionOutput,
} from './dto/update-commission.dto';
import { BulkDeleteCommissionUseCase } from './use-case/bulk-delete-commission.use-case';
import { CreateCommissionUseCase } from './use-case/create-commission.use-case';
import { DeleteCommissionUseCase } from './use-case/delete-commission.use-case';
import { FindCommissionByIdUseCase } from './use-case/find-commission-by-id.use-case';
import { FindCommissionByIdsUseCase } from './use-case/find-commission-by-ids.use-case';
import { SearchCommissionUseCase } from './use-case/search-commission.use-case';
import { UpdateCommissionUseCase } from './use-case/update-commission.use-case';
import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import { CreateCommissionFromStaticExcelUseCase } from './use-case/create-commission-from-stastic-excel.use-case';
import { CommissionEntity } from './entity/commission.entity';
import CommissionDataLoader from './commission.loader';
import { SellerEntity } from '../seller/entity/seller.entity';

@Resolver(() => CommissionQuery)
export class CommissionQueryResolver {
  constructor(
    private readonly searchCommissionUseCase: SearchCommissionUseCase,
    private readonly findCommissionByIdUseCase: FindCommissionByIdUseCase,
    private readonly findCommissionByIdsUseCase: FindCommissionByIdsUseCase,
  ) {}

  @Query(() => CommissionQuery)
  async commission() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindCommissionOutput)
  async findCommissionById(
    @Args('input') input: FindCommissionByIdInput,
  ): Promise<FindCommissionOutput> {
    return this.findCommissionByIdUseCase.findCommissionByid(input);
  }

  @ResolveField(() => FindManyCommissionsOutput)
  async findCommissionByIds(
    @Args('input') input: FindCommissionByIdsInput,
  ): Promise<FindManyCommissionsOutput> {
    return this.findCommissionByIdsUseCase.findCommissionByids(input);
  }

  @ResolveField(() => SearchCommissionOutput)
  async searchCommissions(
    @Args('input') input: SearchCommissionInput,
  ): Promise<SearchCommissionOutput> {
    return this.searchCommissionUseCase.search(input);
  }
}

@Resolver(() => CommissionMutation)
export class CommissionMutationResolver {
  constructor(
    private readonly createCommissionUseCase: CreateCommissionUseCase,
    private readonly updateCommissionUseCase: UpdateCommissionUseCase,
    private readonly deleteCommissionUseCase: DeleteCommissionUseCase,
    private readonly bulkDeleteCommissionUseCase: BulkDeleteCommissionUseCase,
    private readonly createCommissionFromStaticExcelUseCase: CreateCommissionFromStaticExcelUseCase,
  ) {}

  @Mutation(() => CommissionMutation)
  async commission() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateCommissionOutput)
  // @PanelGuard<MethodDecorator>(Permission.CREATE_SELLER, Permission.CREATE)
  async createCommission(
    @Args('input') input: CreateCommissionInput,
  ): Promise<CreateCommissionOutput> {
    return this.createCommissionUseCase.createCommission(input);
  }

  @ResolveField(() => CreateCommissionOutput)
  // @PanelGuard<MethodDecorator>(Permission.CREATE_SELLER, Permission.CREATE)
  async createCommissionFromStaticExcel(): Promise<CreateCommissionOutput> {
    return this.createCommissionFromStaticExcelUseCase.createCommission();
  }

  @ResolveField(() => UpdateCommissionOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_SELLER, Permission.UPDATE)
  async updateCommission(
    @Args('input') input: UpdateCommissionInput,
  ): Promise<UpdateCommissionOutput> {
    return this.updateCommissionUseCase.updateCommission(input);
  }

  @ResolveField(() => DeleteCommissionOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_SELLER, Permission.DELETE)
  async deleteCommission(
    @Args('input') input: DeleteCommissionInput,
  ): Promise<DeleteCommissionOutput> {
    return this.deleteCommissionUseCase.deleteCommission(input);
  }

  @ResolveField(() => DeleteCommissionOutput)
  @PanelGuard<MethodDecorator>(
    Permission.BULK_DELETE_SELLER,
    Permission.BULK_DELETE,
  )
  async bulkDeleteCommission(
    @Args('input') input: BulkDeleteCommissionInput,
  ): Promise<DeleteCommissionOutput> {
    return this.bulkDeleteCommissionUseCase.bulkDeleteCommission(input);
  }
}

@Resolver(() => CommissionEntity)
export class CommissionResolver {
  constructor(private readonly loader: CommissionDataLoader) {}

  @ResolveField(() => SellerEntity, { nullable: true })
  async seller(@Parent() commission: CommissionEntity) {
    const sellerId = commission.seller;
    if (!sellerId) return null;
    return this.loader.batchSeller.load(sellerId);
  }
}

export const CommissionResolvers = [
  CommissionQueryResolver,
  CommissionMutationResolver,
  CommissionResolver,
];
