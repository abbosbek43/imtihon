import { Body, Controller, Delete, Get, Param, Patch, Post, SetMetadata } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription_plans.service';
import { CreteSubscriptionPlan } from './dto/subscriptionplan.dto';
import { UpdateSubscriptionPlanDto } from './dto/updatesubscriptionplan';

@Controller('subscription-plans')
@SetMetadata("isPublic",true)
export class SubscriptionPlansController {
    constructor (private subscriptionS:SubscriptionPlansService){}
    @Post('subscriptionplan')
    create(@Body() data:CreteSubscriptionPlan){
        return this.subscriptionS.createSubscription(data)
    }
    @Get('subscriptionplan')
    getall(){
        return this.subscriptionS.getAllSubscription()
    }
    @Get("subscriptionplan/:id")
    getOne(@Param('id') id : string ){
        return this.subscriptionS.getOneSubscription(id)
    }
    @Patch('subscriptionplan/:id')
    update(@Param('id') id : string , @Body() dta:UpdateSubscriptionPlanDto){
        return this.subscriptionS.UpdateSubscription(id,dta)
    }    
    @Delete("subscriptionplan/:id")
    DELETE(@Param('id') id:string ){
        return this.subscriptionS.DeleteSubscription(id)
    }
}

