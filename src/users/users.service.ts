import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { hashService } from 'src/utils/bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  public async findById(id: string){
    const result = await this.userModel.findById(id);

    return result;
  }

  public async create(user: CreateUserDto) {
    const findUser = await this.userModel.findOne({ email: user.email });

    if (findUser) {
      throw new BadRequestException(
        `Usuário com email ${user.email} já cadastrado`,
      );
    }

    const hash = await hashService.hash(user.password);

    const newUser = new this.userModel({
      ...user,
      password: hash,
    });
    await newUser.save();

    return newUser._id;
  }

  public async auth(data: LoginDto) {
    const findUser = await this.userModel.findOne({ email: data.email });

    if (!findUser) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    const isMatch = await hashService.compare(data.password, findUser.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    const token = await this.jwtService.signAsync({ id: findUser.id });

    return {
      token,
      id: findUser.id,
    };
  }
}
