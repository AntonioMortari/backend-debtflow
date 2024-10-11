import { IsDateString, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateEntrieDto{

    @IsOptional()
    @IsString()
    @IsIn(['paid', 'toPay'], { message: 'Status must be either "paid" or "toPay"' })
    status: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @IsMongoId()
    @IsNotEmpty()
    userId: string;
}