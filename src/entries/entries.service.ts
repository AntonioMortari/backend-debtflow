import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntrieDto } from './dto/create-entrie.dto';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entrie, EntrieDocument } from './schema/entrie.schema';
import { UpdateEntrieDto } from './dto/update-entrie.dto';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(Entrie.name) private entrieModel: Model<Entrie>,
    private userService: UsersService,
  ) {}

  public async findByUserId(userId: string, status?: 'paid' | 'toPay'): Promise<EntrieDocument[]>{
    const findUser = await this.userService.findById(userId);

    if(!findUser){
        throw new NotFoundException('Usuário não encontrado')
    }

    const filters: Record<string, string> = {
      userId
    }

    if(status){
      filters.status = status
    }

    const result = await this.entrieModel.find(filters);

    return result;
  }

  public async create(entrie: CreateEntrieDto) {
    const findUser = await this.userService.findById(entrie.userId);

    if (!findUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const newEntrie = new this.entrieModel(entrie);

    await newEntrie.save();

    return newEntrie.id;
  }

  public async deleteById(id: string) {
    const findEntrie = await this.entrieModel.findById(id);

    if (!findEntrie) {
      throw new NotFoundException('Dívida não encontrada');
    }

    await this.entrieModel.deleteOne({ _id: id });
  }

  public async updateById(id: string, fields: UpdateEntrieDto) {
    const findEntrie = await this.entrieModel.findById(id);

    if (!findEntrie) {
      throw new NotFoundException('Dívida não encontrada');
    }

    await this.entrieModel.updateOne({ _id: id }, fields);
  }
}
