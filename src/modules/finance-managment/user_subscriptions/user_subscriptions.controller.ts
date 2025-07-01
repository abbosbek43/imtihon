import { Controller, Post, Get, Put, Delete, Req, Param, Body } from '@nestjs/common';
import { UserSubscriptionsService } from './user_subscriptions.service';
import { CreateUserSubscriptionDto } from './dto/userSubscription.dto';
import { Request } from 'express';

@Controller('user-subscriptions')
export class UserSubscriptionsController {
  constructor(private readonly u_planService: UserSubscriptionsService) {}

  @Post('create-one/user-plan')
  createUserPlan(
    @Body() data: CreateUserSubscriptionDto,
    @Req() req: Request,
  ) {
    // @ts-ignore
    const user_id = req['user'].id;
    return this.u_planService.createUserSubscription(user_id, data);
  }

  @Delete('delete-one/:sudId')
  removeById(
    @Param('sudId') sudId: string,
    @Req() req: Request,
  ) {
    // @ts-ignore
    const user_id = req['user'].id;
    return this.u_planService.removeUserPlan(user_id, sudId); // ✅ return added
  }

  @Get('get-all')
  getAll() {
    return this.u_planService.getAll();
  }
}
