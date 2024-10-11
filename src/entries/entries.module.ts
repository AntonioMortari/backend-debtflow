import { Module } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Entrie, EntrieSchema } from './schema/entrie.schema';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Entrie.name, schema: EntrieSchema}, {name: User.name, schema: UserSchema}])],
  controllers: [
    EntriesController,
  ],
  providers: [EntriesService, UsersService],
})
export class EntriesModule {}
