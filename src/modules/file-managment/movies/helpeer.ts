import { UnsupportedMediaTypeException } from '@nestjs/common';
import { SubscriptionType } from '@prisma/client';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidV4 } from 'uuid';

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowed: string[] = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowed.includes(file.mimetype)) {
    return callback(
      new UnsupportedMediaTypeException('Only .jpg, .png, .jpeg formats allowed!'),
      false,
    );
  }
  callback(null, true);
};

export const storagePoster = diskStorage({
  destination: join(process.cwd(), 'src', 'uploads', 'posters'),
  filename(req, file, call) {
    const filename = uuidV4() + extname(file.originalname);
    call(null, filename);
  },
});

export function MoviefileFilter(
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) {
  const allowed: string[] = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowed.includes(file.mimetype)) {
    callback(
      new UnsupportedMediaTypeException(
        'profile image support only  image/jpg image/png image/jpeg ',
      ),
      false,
    );
  }
  callback(null, true);
}
export const swaggerOptions = {
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      releaseYear: { type: 'integer' },
      durationMinutes: { type: 'number' },
      rating : {type : "string"},
      subscriptionType: {
        type: 'string',
        enum: [...Object.values(SubscriptionType)],
      },
      categoriy_ids: {
        type: 'array',
        items: { type: 'string' },
      },
      poster : {
        type: 'string',
        format: 'binary',
      },
    },
  },
};