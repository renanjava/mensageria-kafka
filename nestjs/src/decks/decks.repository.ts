import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deck } from './schema/deck.schema';
import { CreateDeckDto } from './dto/create-deck.dto';

@Injectable()
export class DecksRepository {
  constructor(
    @InjectModel(Deck.name) private readonly deckModel: Model<Deck>,
  ) { }

  async create(createDeckDto: CreateDeckDto): Promise<Deck> {
    const createdDeck = new this.deckModel(createDeckDto);
    return createdDeck.save();
  }

  async findAll(): Promise<Deck[]> {
    return this.deckModel.find().exec();
  }

  async findByUser(userId: string): Promise<Deck[] | null> {
    return this.deckModel.find({ userId: userId }).exec();
  }
}
