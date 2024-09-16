import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StoreService } from './store.service';
import { FindPetWidthStatus } from 'src/pet/dto/pet.input';
import { ChangeStatusOrderOutPut, CreateOrderOutPut, DeleteOrderOutPut, FindOrderByIdOutPut, FindPetByStatus} from './entities/store.output';
import { ChangeStatusOrderInput, DeleteOrderInput, FindOrderByIdInput, PlaceOrderInput } from './dto/store.input';


@Resolver()
export class StoreResolver {
  constructor(private readonly storeService: StoreService
   
    ) {}
  @Query(() => FindPetByStatus)
  async findPetWithStatus(@Args('petStatus') ip: FindPetWidthStatus) {
    const pets = await this.storeService.findByStatus(ip.status)
    return {
      pets: pets,
      totalPets: pets.length
    };
  }

  @Mutation(() => CreateOrderOutPut)
  async createOrder(@Args('createorder') order: PlaceOrderInput) {
    const d = new Date(order.shipingDate)
    let price = await this.storeService.storeOrder(order.petsID, d)
    const totalItems = order.petsID.length
    if(totalItems === 1)
      price += price * 0.1
    else if(totalItems > 1 && totalItems < 5)
      price += price * 0.08
    else 
    price += price * 0.05
    return {
      status: 200,
      message: "order is waiting for approve",
      totalPrice: price
    }
  }

  @Mutation(() => ChangeStatusOrderOutPut )
  async changeStatusOrder(@Args('changestatusorder') ip: ChangeStatusOrderInput) {
    await this.storeService.changeOrderStatus(ip.orderid, ip.status)
    return {
      status: 200,
      message: "order approved"
    }
  }

  @Query(() => FindOrderByIdOutPut)
  async findorderbyid(@Args('id') ip: FindOrderByIdInput) {
    const order = await this.storeService.findPurchase(ip.orderid);
    return order
  }

  @Mutation(() => DeleteOrderOutPut)
  async deleteorder(@Args('id') ip: DeleteOrderInput) {
    await this.storeService.deletePurchase(ip.orderid);
    return {
      status: 200,
      message: `deleted order ${ip.orderid}`
    }
  }
}
