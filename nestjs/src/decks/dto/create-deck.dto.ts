import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { DeckDto } from "./deck.dto";

export class CreateDeckDto extends DeckDto {
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    userId: string;
}