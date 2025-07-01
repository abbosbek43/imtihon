import { Module } from '@nestjs/common';
import { AuthModule } from './modules/security/auth/auth.module';
import { ProfilesModule } from './modules/foydalanuvchilar/profiles/profiles.module';
import { SubscriptionPlansModule } from './modules/finance-managment/subscription_plans/subscription_plans.module';
import { UserSubscriptionsModule } from './modules/finance-managment/user_subscriptions/user_subscriptions.module';
import { PaymentsModule } from './modules/finance-managment/payments/payments.module';
import { CategoriesModule } from './modules/file-managment/categories/categories.module';

import { FavoritesModule } from './modules/foydalanuvchilar/favorites/favorites.module';
import { ReviewsModule } from './modules/foydalanuvchilar/reviews/reviews.module';
import { PrismaService } from './common/prisma/prisma.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { TokenModule } from './modules/security/token/token.module';
import { MailerModule } from './modules/security/mailer/mailer.module';
import { RedisModule } from './modules/security/redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GuardService } from './common/guards/guards.service';
import { UsersModule } from './modules/foydalanuvchilar/users/users.module';
import { MoviesModule } from './modules/file-managment/movies/movies.module';
import { APP_GUARD } from '@nestjs/core';
import { HistoryModule } from './modules/foydalanuvchilar/history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true ,secret : "molxona"}),
    AuthModule,
    ProfilesModule,
    SubscriptionPlansModule,
    UserSubscriptionsModule,
    // PaymentsModule,
    CategoriesModule,
    FavoritesModule,
    ReviewsModule,
    // PrismaModule,
    // TokenModule,
    // MailerModule,
    // RedisModule,
    UsersModule,
    MoviesModule,
    HistoryModule,
  ],
  providers: [
    PrismaService,
    GuardService,
    {
      provide: APP_GUARD,
      useClass : GuardService,
    },
  ],
  exports: [GuardService],
})
export class AppModule {}
