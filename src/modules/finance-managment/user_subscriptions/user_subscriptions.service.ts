import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserSubscriptionDto } from './dto/userSubscription.dto';
import { RemoveByIdDto } from './dto/updateuserSubscription.dto';

@Injectable()
export class UserSubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async getAll(){
    const data = await this.prisma.userSubscription.findMany()
    return data
  }

  async createUserSubscription(
    userId: string,
    data: CreateUserSubscriptionDto,
  ) {
    const payload = await this.checkExistsAndIsActive(userId, data);
    const newUserPlan = await this.prisma.userSubscription.create({
      data: payload,
      include: { user: { select: { id: true, username: true, email: true } } },
    });
    return {
      message: 'Planvcfdsvfgregbfuvbreluisgirshgvilrts 🤣🤣🤣🤣🤣',
      data: newUserPlan,
    };
  }

  async checkExistsAndIsActive(
    userId: string,
    data: CreateUserSubscriptionDto,
  ) {
    const existsUser = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (!existsUser) throw new NotFoundException('user not found');

    const plan = await this.prisma.subscriptionPlan.findFirst({
      where: { id: data.planId },
    });
    if (!plan) throw new NotFoundException('plan not found');

    if (!plan.isActive)
      throw new BadRequestException(
        'this subscription already taken and it is  working',
      );

    const activeSubscriptions = await this.prisma.userSubscription.findFirst({
      where: {
        userId,
        status: 'active',
      },
    });
    if (activeSubscriptions)
      throw new BadRequestException(
        "you have an active subscription please make sure you don't have any subscription ",
      );

    const payload = {
      userId: userId,
      planId: data.planId,
      autoRenew: data.autoRenew || true,
    };
    return payload;
  }

  async removeUserPlan(userId: string, id: string) {
    const existsUser = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (!existsUser) throw new NotFoundException('user not found');
    const userPlanExists = await this.prisma.userSubscription.findFirst({
      where: {
        userId,
      },
    });
    if (!userPlanExists) throw new NotFoundException(
        `UserSubscriptions not found by id : [ ${id} and userId ${userId} ] !`,
      );

    const deletedSubscription = await this.prisma.userSubscription.delete({where : {id : id}})
    return {
      message : `UserSubscriptions deleted by id [${id}]`
    }
  }
}

