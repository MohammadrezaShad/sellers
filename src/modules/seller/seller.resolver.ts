import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Permission } from '@/common/permissions/permission-type';
import { PanelGuard } from '@/modules/auth/guards/panel.guard';
import { CreateSellerInput, CreateSellerOutput } from './dto/create-seller.dto';
import {
  BulkDeleteSellerInput,
  DeleteSellerInput,
  DeleteSellerOutput,
} from './dto/delete-seller.dto';
import {
  FindManySellersOutput,
  FindSellerByIdInput,
  FindSellerByIdsInput,
  FindSellerOutput,
} from './dto/find-seller.dto';
import { SearchSellerInput, SearchSellerOutput } from './dto/search-seller.dto';
import { SellerMutation, SellerQuery } from './dto/seller.dto';
import { UpdateSellerInput, UpdateSellerOutput } from './dto/update-seller.dto';
import { BulkDeleteSellerUseCase } from './use-case/bulk-delete-seller.use-case';
import { CreateSellerUseCase } from './use-case/create-seller.use-case';
import { DeleteSellerUseCase } from './use-case/delete-seller.use-case';
import { FindSellerByIdUseCase } from './use-case/find-seller-by-id.use-case';
import { FindSellerByIdsUseCase } from './use-case/find-seller-by-ids.use-case';
import { SearchSellerUseCase } from './use-case/search-seller.use-case';
import { UpdateSellerUseCase } from './use-case/update-seller.use-case';
import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import { CreateSellerFromStaticExcelUseCase } from './use-case/create-seller-from-stastic-excel.use-case';

@Resolver(() => SellerQuery)
export class SellerQueryResolver {
  constructor(
    private readonly searchSellerUseCase: SearchSellerUseCase,
    private readonly findSellerByIdUseCase: FindSellerByIdUseCase,
    private readonly findSellerByIdsUseCase: FindSellerByIdsUseCase,
  ) {}

  @Query(() => SellerQuery)
  async seller() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindSellerOutput)
  async findSellerById(
    @Args('input') input: FindSellerByIdInput,
  ): Promise<FindSellerOutput> {
    return this.findSellerByIdUseCase.findSellerByid(input);
  }

  @ResolveField(() => FindManySellersOutput)
  async findSellerByIds(
    @Args('input') input: FindSellerByIdsInput,
  ): Promise<FindManySellersOutput> {
    return this.findSellerByIdsUseCase.findSellerByids(input);
  }

  @ResolveField(() => SearchSellerOutput)
  async searchSellers(
    @Args('input') input: SearchSellerInput,
  ): Promise<SearchSellerOutput> {
    return this.searchSellerUseCase.search(input);
  }
}

@Resolver(() => SellerMutation)
export class SellerMutationResolver {
  constructor(
    private readonly createSellerUseCase: CreateSellerUseCase,
    private readonly updateSellerUseCase: UpdateSellerUseCase,
    private readonly deleteSellerUseCase: DeleteSellerUseCase,
    private readonly bulkDeleteSellerUseCase: BulkDeleteSellerUseCase,
    private readonly createSellerFromStaticExcelUseCase: CreateSellerFromStaticExcelUseCase,
  ) {}

  @Mutation(() => SellerMutation)
  async seller() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateSellerOutput)
  // @PanelGuard<MethodDecorator>(Permission.CREATE_SELLER, Permission.CREATE)
  async createSeller(
    @Args('input') input: CreateSellerInput,
  ): Promise<CreateSellerOutput> {
    return this.createSellerUseCase.createSeller(input);
  }

  @ResolveField(() => CreateSellerOutput)
  // @PanelGuard<MethodDecorator>(Permission.CREATE_SELLER, Permission.CREATE)
  async createSellerFromStaticExcel(): Promise<CreateSellerOutput> {
    return this.createSellerFromStaticExcelUseCase.createSeller();
  }

  @ResolveField(() => UpdateSellerOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_SELLER, Permission.UPDATE)
  async updateSeller(
    @Args('input') input: UpdateSellerInput,
  ): Promise<UpdateSellerOutput> {
    return this.updateSellerUseCase.updateSeller(input);
  }

  @ResolveField(() => DeleteSellerOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_SELLER, Permission.DELETE)
  async deleteSeller(
    @Args('input') input: DeleteSellerInput,
  ): Promise<DeleteSellerOutput> {
    return this.deleteSellerUseCase.deleteSeller(input);
  }

  @ResolveField(() => DeleteSellerOutput)
  @PanelGuard<MethodDecorator>(
    Permission.BULK_DELETE_SELLER,
    Permission.BULK_DELETE,
  )
  async bulkDeleteSeller(
    @Args('input') input: BulkDeleteSellerInput,
  ): Promise<DeleteSellerOutput> {
    return this.bulkDeleteSellerUseCase.bulkDeleteSeller(input);
  }
}

export const SellerResolvers = [SellerQueryResolver, SellerMutationResolver];
