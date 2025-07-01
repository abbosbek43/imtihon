import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { GuardService } from 'src/common/guards/guards.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProfilesService, GuardService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
