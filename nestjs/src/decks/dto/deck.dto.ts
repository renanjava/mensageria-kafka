import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CardDto } from './cards.dto';

export abstract class DeckDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardDto)
  cards?: CardDto[];

  @IsString()
  @IsNotEmpty()
  commander: string;
}
