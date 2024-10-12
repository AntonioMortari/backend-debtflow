import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body(new ValidationPipe()) user: CreateUserDto){
        const result = await this.service.create(user);

        return result;
    }

    @Post('auth')
    public async auth(@Body(new ValidationPipe()) data: LoginDto){
        const result = await this.service.auth(data);

        return result;
    }
}
