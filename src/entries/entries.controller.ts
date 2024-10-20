import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntrieDto } from './dto/create-entrie.dto';
import { UpdateEntrieDto } from './dto/update-entrie.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('entries')
export class EntriesController {
    constructor(
        private entrieService: EntriesService
    ){}

    @UseGuards(AuthGuard)
    @Get('/user/:userId')
    public async findByUserId(@Param('userId') userId: string, @Query('status') status?: 'paid' | 'toPay'){
        const result = await this.entrieService.findByUserId(userId, status);

        return result;
    }

    @UseGuards(AuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body(new ValidationPipe()) entrie: CreateEntrieDto){
        const result = await this.entrieService.create(entrie);

        return {
            id: result
        };
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async destroy(@Param('id') id: string){
        await this.entrieService.deleteById(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async update(@Param('id') id: string, @Body(new ValidationPipe) fields: UpdateEntrieDto){
        await this.entrieService.updateById(id, fields);
    }

}
