import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Status , Role} from '../auth/decorators';
import { JwtGuard, StatusGuard } from '../auth/guards';
import { RoleGuard } from '../auth/guards';
import { UserRole, UserStatus } from '../user/types';
import { ApproveOrderInput, CreateOrderInput, StatusPetArg } from './dto';
import { OrderIdArg } from './dto';
import { Inventory, Order, OrderDocument } from './models';
import { StoreService } from './store.service';

@Resolver()
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}
  @Query( () => Inventory)
  async getInventory(@Args() statusPetArg: StatusPetArg):Promise<Inventory> {
    const petItems = await this.storeService.findPetsByStatus(statusPetArg)
    return {
      pets : petItems ,
      count : petItems.length
    }
  }
  @Mutation( () => Order )
  @Status(UserStatus.ACTIVE)
  @UseGuards( JwtGuard , StatusGuard )
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput):Promise<OrderDocument>{
    return this.storeService.createOrder(createOrderInput)
  }

  @Mutation( () => Order) 
  @Status(UserStatus.ACTIVE)
  @Role(UserRole.ADMIN)
  @UseGuards( JwtGuard , StatusGuard , RoleGuard )
  approveOrder(@Args('approveOderInput') approveOrderInput: ApproveOrderInput):Promise<OrderDocument>{
    return this.storeService.updateStatusOrder(approveOrderInput)
  }

  @Query( () => Order ) 
  @Status(UserStatus.ACTIVE)
  @UseGuards( JwtGuard , StatusGuard )
  order(@Args() orderIdArg: OrderIdArg):Promise<OrderDocument>{
    return this.storeService.findOneOrder(orderIdArg)
  }

  @Mutation( () => Order )
  @Status(UserStatus.ACTIVE)
  @Role(UserRole.ADMIN)
  @UseGuards( JwtGuard , StatusGuard , RoleGuard )
  deleleOrder(@Args() orderIdArg: OrderIdArg):Promise<OrderDocument>{
    return this.storeService.deleteOneOrder(orderIdArg)
  }
  
}
