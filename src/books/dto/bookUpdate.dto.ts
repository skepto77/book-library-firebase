import { IsString, IsOptional } from 'class-validator';
export class BookUpdateDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
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
