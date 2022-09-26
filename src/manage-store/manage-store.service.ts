import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import e from 'express';
import { Model } from 'mongoose';
import { SearchManagePetInput } from 'src/manage-pet/dto/search-manage-pet.input';
import { ManagePet } from 'src/manage-pet/entities/manage-pet.entity';
import { ManagePetService } from 'src/manage-pet/manage-pet.service';
import { calculateOrderPrice } from 'src/utils/calculate-tax';
import { CreateManageStoreInput } from './dto/create-manage-store.input';
import { PlaceOrderInput } from './dto/place-order.input';
import { UpdateManageStoreInput } from './dto/update-manage-store.input';
import { ManageOrder, OrderSchema } from './entities/manage-store.entity';
import { OrderStatus } from './entities/orderStatus.enum';

@Injectable()
export class ManageStoreService {
  constructor(
    @InjectModel('Order') private readonly manageOrder: Model<ManageOrder>,
    private readonly managePetService: ManagePetService
  ) {}

  async createAnOrder(placeOrderInput: PlaceOrderInput) {
    // Generate orderId
    const characters = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGH';
    let orderId = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      orderId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    let petList: ManagePet[] = []
    for(const petId of placeOrderInput.petIdList) {
      const searchManagePetInput: SearchManagePetInput = { where: {
        petId: petId,
        tag: null,
        status: null
      } }
      const pet = await this.managePetService.findPet(searchManagePetInput);
      if(pet) {
        petList.push(...JSON.parse(JSON.stringify(pet)));
      }
    }

    const expectedDate = new Date(placeOrderInput.expectedDate);

    // Calculate order's cost
    let totalCostWithoutTax: number = 0;
    for(const pet of petList) {
      totalCostWithoutTax += pet.price;
    }
    const totalCost: number = calculateOrderPrice(totalCostWithoutTax, petList.length);
    const newOrder = {
      orderId: orderId,
      petList: petList,
      expectedShippingDate: expectedDate,
      orderStatus: OrderStatus.PLACED,
      totalCost: totalCost.toFixed(2)
    }

    const createdOrder = this.manageOrder.create(newOrder);
    if (createdOrder) {
      return createdOrder;
    }
    throw new Error('Can not place a new order');
  }

  async approveAnOrder(orderId: string, orderStatus: string): Promise<ManageOrder> {
    const order = await this.manageOrder.findOne({ orderId: orderId });
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    if (order.orderStatus === OrderStatus.PLACED) {
      if (orderStatus === OrderStatus.DELIVERED || orderStatus === OrderStatus.APPROVED)
      order.orderStatus = orderStatus;
    } else {
      throw new Error(`Can not approve a ${OrderStatus.APPROVED} or ${OrderStatus.DELIVERED} order.`);
    }
    await order.save();
    return order;
  }

  async findOrderById(orderId: string): Promise<ManageOrder> {
    const order = await this.manageOrder.findOne({ orderId: orderId });
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    return order;
  }

  async deleteOrder(orderId: string): Promise<ManageOrder> {
    const order = await this.findOrderById(orderId);
    if (order.orderStatus === OrderStatus.APPROVED || order.orderStatus === OrderStatus.DELIVERED) {
      throw new Error(`Can not delete order that are ${OrderStatus.APPROVED} or ${OrderStatus.DELIVERED}`);
    }
    const deletedOrder = await this.manageOrder.findOneAndDelete({ orderId: order.orderId });
    return deletedOrder;
  }
}
