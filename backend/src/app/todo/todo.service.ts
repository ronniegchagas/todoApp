import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll() {
    return await this.todoRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOneOrFail(id: string) {
    try {
      return await this.todoRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data) {
    const newTodo = this.todoRepository.create(data);
    return await this.todoRepository.save(newTodo);
  }

  async update(id: string, data) {
    const todo = await this.findOneOrFail(id);

    this.todoRepository.merge(todo, data);
    return await this.todoRepository.save(todo);
  }

  async delete(id: string) {
    await this.findOneOrFail(id);
    await this.todoRepository.softDelete(id);
  }
}
