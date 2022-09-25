import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { PetRepository } from '../pet/pet.repository';
import { ApproveOrderInput, CreateOrderInput, StatusPetArg } from './dto';
import { OrderIdArg } from './dto';
import { OrderDocument, PetItem } from './models';
import { OrderRepository } from './repositories';
import { Discount, OrderStatus, SaleTax } from './types';

@Injectable()
export class StoreService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly petRepository: PetRepository
    ) { }
    
    async getListPrice(pets: string[]){
        const pricePromises = pets.map( async (petid) => {
            const pet = await this.petRepository.FindOne({
                petid: petid
            }, 'price  -_id', { lean: true })
            if (pet) return pet?.price
            return 0 ;
        })
        return await Promise.all(pricePromises)
    }

    calculateTotalHaveTax(count:number , total:number):number {
        if(count === 0) return 0 ;
        if( count === 1 ) return total + (total * SaleTax.TEN_PERCENT)
        if( count > 1 && count < 5) return total + (total * SaleTax.EGHT_PERCENT)
        if( count > 5 && count < 10) return total + (total * SaleTax.FIVE_PERCENT)
        if( count > 10) {
            const totalHaveDiscount = total + (total * Discount.FIVE_PERCENT)
            return totalHaveDiscount + (totalHaveDiscount * SaleTax.TEN_PERCENT)
        }
    }

    countOrderItems(price: number[]): number {
        let count = 0;
        price.filter( amount => {
            if (amount > 0) count++
        })
        return count ;
    }

    calculateTotalNoTax(price: number[]) {
        return price.reduce((prePrice, currPrice) => prePrice + currPrice , 0 )
    }   

    async findPetsByStatus(statusPetArg: StatusPetArg): Promise<PetItem[]> {
        const pets = await this.petRepository.FindAll(statusPetArg,
            'petid status -_id',
            { lean: true });
        const petItems: PetItem[] = JSON.parse(JSON.stringify(pets))
        return petItems ;
    }
    async createOrder(createOderInput: CreateOrderInput): Promise<OrderDocument> {
        const listPrice = await this.getListPrice(createOderInput.pets)
        const countItem = this.countOrderItems(listPrice)
        const totalNoTax = this.calculateTotalNoTax(listPrice)
        return await this.orderRepository.Create(
            {   
                orderid : v4() ,
                ...createOderInput,
                total: this.calculateTotalHaveTax(countItem , totalNoTax)
            }
        )
    }
    async updateStatusOrder(approveOrderInput: ApproveOrderInput):Promise<OrderDocument>{
        const { orderid , status } =  approveOrderInput
        const order  = await this.orderRepository.FindOne({
            orderid : orderid
        } , 'status -_id' , {lean : true })
        if(!order) throw new BadRequestException()
        if( !order || order?.status === OrderStatus.APPROVED || order?.status === OrderStatus.DELIVERED) throw new BadRequestException()
        return await this.orderRepository.FindOneAndUpdate({
            orderid : orderid , 
        }, { status : status } , { new : true });
    }

    async findOneOrder(orderIdArg: OrderIdArg):Promise<OrderDocument>{
        const order = await this.orderRepository.FindOne( 
            orderIdArg ,
             '-_id' , { lean : true } )
        if(!order) throw new BadRequestException()
        return order
    }
    async deleteOneOrder(orderIdArg: OrderIdArg):Promise<OrderDocument>{
        const order = await this.orderRepository.FindOne(orderIdArg) 
        if(!order) throw new BadRequestException()
        if( order?.status === OrderStatus.APPROVED || order?.status === OrderStatus.DELIVERED) throw new BadRequestException()
        return await this.orderRepository.FindOneAndDelete(orderIdArg)
    }
}
