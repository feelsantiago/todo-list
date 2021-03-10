import { IsNotEmpty, IsString } from 'class-validator';

export class TodoDto {
    @IsString()
    @IsNotEmpty()
    public description: string;
}
