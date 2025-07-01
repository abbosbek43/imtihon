import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'omadbek1223erubdnx@gmail.com',
        pass: 'tytuwpsplbfzrtwh ',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    try {
      const mailOptions = {
        from: '"MovieSite" <omadbek1223erubdnx@gmail.com>',
        to,
        subject,
        text,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email yuborildi: ', info.messageId);
      return info;
    } catch (error) {
      console.error('Email yuborishda xatolik:', error);
      throw new InternalServerErrorException('Email yuborilmadi');
    }
  }
  async sendVerificationEmail(to: string, code: string) {
    return this.transporter.sendMail({
      from: '"Kino Sayti" <omadbek1223erubdnx@gmail.com>',
      to,
      subject: 'Email tasdiqlash kodi',
      html: `
        <h2>Assalomu alaykum!</h2>
        <p>Sizning tasdiqlash kodingiz: <b>${code}</b></p>
        <p>Kod 5 daqiqa davomida amal qiladi.</p>
      `,
    });
  }
}
