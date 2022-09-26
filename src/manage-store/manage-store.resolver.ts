import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ManageStoreService } from './manage-store.service';
import { ManageOrder } from './entities/manage-store.entity';
import { CreateManageStoreInput } from './dto/create-manage-store.input';
import { UpdateManageStoreInput } from './dto/update-manage-store.input';
import { ManagePet } from 'src/manage-pet/entities/manage-pet.entity';
import { ManagePetService } from 'src/manage-pet/manage-pet.service';
import { GetQueryByStatusRes } from './entities/query-pet-by-status.response';
import { PlaceOrderInput } from './dto/place-order.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => ManageOrder)
export class ManageStoreResolver {
  constructor(
    private readonly manageStoreService: ManageStoreService,
    private readonly managePetService: ManagePetService  
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ManageOrder)
  placeOrder(@Args('placeOrderInput') placeOrderInput: PlaceOrderInput) {
    return this.manageStoreService.createAnOrder(placeOrderInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => GetQueryByStatusRes, { name: 'queryPetByStatus' })
  queryPetByStatus(@Args('status', { type: () => String }) status: string) {
    return this.managePetService.findPetByStatus(status);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ManageOrder)
  approveAnOrder(
    @Args('orderId', { type: () => String }) orderId: string,
    @Args('orderStatus', { type: () => String }) orderStatus: string
  ): Promise<ManageOrder> {
    return this.manageStoreService.approveAnOrder(orderId, orderStatus);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ManageOrder)
  findOrderById(@Args('orderId', { type: () => String }) orderId: string): Promise<ManageOrder> {
    return this.manageStoreService.findOrderById(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ManageOrder)
  deleteOrder(@Args('orderId', { type: () => String }) orderId: string) {
    return this.manageStoreService.deleteOrder(orderId);
  }
}
