import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
}
