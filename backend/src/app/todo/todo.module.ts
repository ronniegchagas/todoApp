import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService], // exporta modulo para que possam ser usados dentro de outros modulos
})
export class TodoModule {}
