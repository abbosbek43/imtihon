import { IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionStatus } from '@prisma/client';
// dto/remove-id.dto.ts
import { IsUUID } from 'class-validator';

export class RemoveByIdDto {
  @IsUUID()
  id: string;
}

export class UpdateUserSubscriptionDto {
  @ApiProperty({
    description: 'Avtomatik yangilanish',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;

  @ApiProperty({
    description: 'Obuna holati',
    enum: SubscriptionStatus,
    example: 'canceled',
    required: false
  })
  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;
}
