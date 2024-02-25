import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: "./public",
    }),
    RoomsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
