import { PartialType } from '@nestjs/swagger';
import { CreteSubscriptionPlan } from './subscriptionplan.dto';

export class UpdateSubscriptionPlanDto extends PartialType(CreteSubscriptionPlan) {}