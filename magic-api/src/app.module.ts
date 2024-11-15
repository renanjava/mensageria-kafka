import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { DecksModule } from './decks/decks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/mtg'),
    UserModule,
    DecksModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
})
export class AppModule {}
