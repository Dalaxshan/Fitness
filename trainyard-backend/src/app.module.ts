import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { ConfigModule } from '@nestjs/config';

// Module Imports
import { MemberModule } from './member/member.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { PackageModule } from './package/package.module';
import { InvoiceModule } from './invoice/invoice.module';
import { MembershipModule } from './membership/membership.module';
import { AttendanceModule } from './attendance/attendance.module';
import { TrainerModule } from './trainer/trainer.module';
import { BullModule } from '@nestjs/bull';
import { SMSModule } from './sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.production'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    AdminModule,
    AuthModule,
    MemberModule,
    PackageModule,
    InvoiceModule,
    MembershipModule,
    AttendanceModule,
    TrainerModule,
    SMSModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
