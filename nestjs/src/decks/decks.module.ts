import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { DecksRepository } from './decks.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Deck, DeckSchema } from './schema/deck.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '@/users/user.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
    UserModule,
    CacheModule.register(),
  ],
  controllers: [DecksController],
  providers: [DecksService, DecksRepository, JwtService, ConfigService],
})
export class DecksModule { }
