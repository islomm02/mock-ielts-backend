import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { PrismaModule } from './prisma/prisma.module';
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [AuthModule, QuestionsModule, PrismaModule, TestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
