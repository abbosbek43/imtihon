import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { ProfilesModule } from './profiles/profiles.module';
import { SubscriptionPlansModule } from './subscription_plans/subscription_plans.module';
import { UserSubscriptionsModule } from './user_subscriptions/user_subscriptions.module';
import { PaymentsModule } from './payments/payments.module';
import { CategoriesModule } from './categories/categories.module';
import { MoviesModule } from './movies/movies.module';
import { MovieCategoriesModule } from './movie_categories/movie_categories.module';
import { MovieFilesModule } from './movie_files/movie_files.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { TokenModule } from './token/token.module';
import { MailerModule } from './mailer/mailer.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({}), 
  
    AuthModule,  ProfilesModule, SubscriptionPlansModule, UserSubscriptionsModule, PaymentsModule, CategoriesModule, MoviesModule, MovieCategoriesModule, MovieFilesModule, FavoritesModule, ReviewsModule, PrismaModule, TokenModule, MailerModule, RedisModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
