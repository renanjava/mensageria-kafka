import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { DecksRepository } from './decks.repository';
import axios from 'axios';
import { CardSchema, Deck } from './schema/deck.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@/users/user.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UploadDeckDto } from './dto/upload-deck.dto';
import { plainToInstance } from 'class-transformer';
import { Possibilities } from '@/utils/possibilities';

@Injectable()
export class DecksService {
  constructor(
    private readonly deckRepository: DecksRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async createDeck(createDeckDto: CreateDeckDto): Promise<Deck> {
    return this.deckRepository.create(createDeckDto);
  }

  async findAll(): Promise<Deck[]> {
    return this.deckRepository.findAll();
  }

  async fetchCommander(commanderName: string): Promise<any> {
    const commanderUrl = `https://api.magicthegathering.io/v1/cards?name=${commanderName}&supertypes="Legendary"`;
    const commanderResponse = await axios.get(commanderUrl);
    const commander = commanderResponse.data.cards[0];
    return commander;
  }

  async fetchCards(cardColor: Array<string>, quantityColor?: Array<number>) {
    if (quantityColor) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let index = -1;
      quantityColor.forEach(async () => {
        index++;
      });
      //console.log("buildedDeck: " + buildedDeck)
      //return buildedDeck
    }
    return this.fetchCards2(cardColor[0]);
  }

  async fetchCards2(cardColor: string, quantityColor?: number) {
    const cardsUrl = `https://api.magicthegathering.io/v1/cards?colorIdentity=${cardColor}`;
    const cardsResponse = await axios.get(cardsUrl);
    const cards = cardsResponse.data.cards;
    if (quantityColor) {
      return cards.slice(0, quantityColor);
    }

    return cards;
  }

  async build(commanderName: string, req: Request) {
    const user = await this.jwtService.verifyAsync(
      req.headers['authorization'].replace('Bearer ', ''),
      {
        secret: this.configService.get<string>('SECRET_KEY'),
      },
    );
    const userId = await this.userRepository.getIdByEmail(user.email);
    const commander = await this.fetchCommander(commanderName);
    const colorQuantity = commander.colorIdentity.length;
    const cards = (
      colorQuantity > 1
        ? await this.generateQuantityColors(colorQuantity, commander)
        : await this.fetchCards(commander.colorIdentity)
    ).slice(0, 99);
    const deck = [commander, ...cards];

    const createDeckDto: CreateDeckDto = {
      commander: commander.name,
      cards: deck,
      userId: userId,
    };

    return this.createDeck(createDeckDto);
  }

  async generateQuantityColors(colorQuantity, commander) {
    let cardQuantity = 99;
    let index = 0;
    const cardQuantityColors = new Array<number>(colorQuantity);
    let allowedColors = new Array<string>();
    allowedColors = commander.colorIdentity;
    allowedColors.forEach((e) => {
      const logicForSorting = cardQuantity - colorQuantity + index;
      const valueForSorting = Math.floor(Possibilities.sortedPossibilities(logicForSorting));
      let sortedNumber;
      if (allowedColors[allowedColors.length - 1] != e)
        sortedNumber = Math.floor(Math.random() * valueForSorting);
      else
        sortedNumber =
          99 -
          cardQuantityColors.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
      cardQuantityColors[index] = sortedNumber;
      cardQuantity -= sortedNumber;
      index++;
    });
    return await this.fetchCards(allowedColors, cardQuantityColors);
  }

  async findByLoggedUser(req: Request) {
    const user = await this.jwtService.verifyAsync(
      req.headers['authorization'].replace('Bearer ', ''),
      {
        secret: this.configService.get<string>('SECRET_KEY'),
      },
    );
    return await this.deckRepository.findByUser(
      await this.userRepository.getIdByEmail(user.email),
    );
  }

  async findByLoggedUserWithCache(req: Request) {
    const user = await this.jwtService.verifyAsync(
      req.headers['authorization'].replace('Bearer ', ''),
      {
        secret: this.configService.get<string>('SECRET_KEY'),
      },
    );
    const findInCache = await this.cacheManager.get('usuarioDecks');
    if (findInCache) {
      return findInCache;
    }
    const usuarioDecks = await this.deckRepository.findByUser(
      await this.userRepository.getIdByEmail(user.email),
    );
    await this.cacheManager.set('usuarioDecks', usuarioDecks);
    return usuarioDecks;
  }

  async fileValidate(file: Express.Multer.File) {
    const jsonFile = JSON.parse(file.buffer.toString('utf8'));
    const uploadDeckDto = plainToInstance(UploadDeckDto, jsonFile);
    const commander = uploadDeckDto.cards.filter((e) => e.name == uploadDeckDto.commander)
    const commanderColors = commander[0].colorIdentity
    uploadDeckDto.cards.forEach((cartas) => {
      if (!(commanderColors.some(cores => cartas.colorIdentity.includes(cores))))
        throw new BadRequestException()
    })
    return uploadDeckDto;
  }
}
