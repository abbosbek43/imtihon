// src/modules/payments/dto/create-payment.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNumber,
  IsEnum,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum PaymentMethod {
  card = 'card',
  paypal = 'paypal',
  bank_transfer = 'bank_transfer',
  crypto = 'crypto',
}

export enum PaymentStatus {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
  refunded = 'refunded',
}

export class CreatePaymentDto {
  @ApiProperty({
    example: '2f6206a6-bc84-4e01-b8cc-bcb768faa202',
    description: 'Obunaga tegishli ID',
  })
  @IsUUID()
  userSubscriptionId: string;

  @ApiProperty({
    example: 59.99,
    description: 'Tolov summasi',
  })
  @IsNumber()
  @Type(() => Number)
  amount: number;

  @ApiProperty({
    example: 'card',
    enum: PaymentMethod,
    description: 'Tolov usuli',
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    example: { card_number: '4242424242424242', exp: '12/26' },
    description: 'Tolov tafsilotlari (JSON formatda)',
  })
  @IsNotEmpty()
  paymentDetails: any;

  @ApiProperty({
    example: 'txn_98765_abcd1234',
    description: 'Tashqi tolov identifikatori',
  })
  @IsString()
  externalTransactionId: string;

  @ApiProperty({
    example: 'pending',
    enum: PaymentStatus,
    required: false,
    description: 'Tolov holati (optional)',
  })
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;
}
