import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI), UsersModule, JwtModule.register({
    secret: process.env.SECRET,
    global: true,
    signOptions: { expiresIn: '1h'}
  })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
