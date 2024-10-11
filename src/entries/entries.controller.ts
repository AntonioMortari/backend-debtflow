import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntrieDto } from './dto/create-entrie.dto';
import { UpdateEntrieDto } from './dto/update-entrie.dto';

@Controller('entries')
export class EntriesController {
    constructor(
        private entrieService: EntriesService
    ){}

    @Get('/user/:userId')
    public async findByUserId(@Param('userId') userId: string){
        const result = await this.entrieService.findByUserId(userId);

        return result;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body(new ValidationPipe()) entrie: CreateEntrieDto){
        const result = await this.entrieService.create(entrie);

        return result;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async destroy(@Param('id') id: string){
        await this.entrieService.deleteById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async update(@Param('id') id: string, @Body(new ValidationPipe) fields: UpdateEntrieDto){
        await this.entrieService.updateById(id, fields);
    }

}
