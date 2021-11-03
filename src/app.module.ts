import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TreesModule } from './trees/trees.module';
import { HugsModule } from './hugs/hugs.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, TreesModule, HugsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
