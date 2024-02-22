import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RoomsModule,
    // ServeStaticModule.forRoot({
    //   rootPath: './public',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
