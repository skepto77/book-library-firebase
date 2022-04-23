import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
export class BookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  authors?: string;

  @IsOptional()
  @IsString()
  favorite?: string;

  @IsOptional()
  @IsString()
  fileCover?: string;

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsString()
  fileBook?: string;
}
