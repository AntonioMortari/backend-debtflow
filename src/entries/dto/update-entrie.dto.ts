import { IsDate, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEntrieDto {

  @IsOptional()  
  @IsString()
  @IsIn(['paid', 'toPay'], { message: 'Status must be either "paid" or "toPay"' })
  status: string | null;

  @IsOptional()  
  @IsString()
  description: string | null;

  @IsOptional()  
  @IsNumber()
  price: number | null;

  @IsOptional()  
  @IsDate()
  date: Date | null;
}
