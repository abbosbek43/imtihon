import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreteSubscriptionPlan } from './dto/subscriptionplan.dto';
import { NotFoundError } from 'rxjs';
import { UpdateSubscriptionPlanDto } from './dto/updatesubscriptionplan';

@Injectable()
export class SubscriptionPlansService {
    constructor (private prisma:PrismaService){}
    async createSubscription(data:CreteSubscriptionPlan){
        const exists =  await this.prisma.subscriptionPlan.findFirst({where:{name:data.name}})

        if(exists) throw new ConflictException("you have this subscription you can't buy second time")

        const result= await this.prisma.subscriptionPlan.create({
            data:{...data}
        })
        return {
            succes:true,
            message:"your subscription created succesfully",
            result
        }
    }
    async getAllSubscription(){
        return this.prisma.subscriptionPlan.findMany()
    }
    async getOneSubscription(id : string ){
        const exists= await this.prisma.subscriptionPlan.findFirst({where:{id:id}})
        if(!exists) throw new NotFoundException("subscription not found ")

        return this.prisma.subscriptionPlan.findFirst({where:{id:id}})

    }
    async UpdateSubscription(id:string , data:UpdateSubscriptionPlanDto){
        const exists = await this.prisma.subscriptionPlan.findFirst({where:{id:id}})
        if(!exists) throw new NotFoundException("subscripittion not found")
        
        await this.prisma.subscriptionPlan.update({
            where:{id:id},
            data:{...data}
        })
        return {
            succes:true,
            message:"subscription updated succesfuly"
        }
    }
    async DeleteSubscription(id:string ){
        await this.prisma.subscriptionPlan.delete({where:{id:id}})

        return {
            succes:true,
            message:'subscription deleted succesfully'
        }
    }

}
