import { Module } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription_plans.service';
import { SubscriptionPlansController } from './subscription_plans.controller';

@Module({
  providers: [SubscriptionPlansService],
  controllers: [SubscriptionPlansController]
})
export class SubscriptionPlansModule {}
