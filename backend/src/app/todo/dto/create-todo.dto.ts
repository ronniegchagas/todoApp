import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  task: string;

  @IsNotEmpty()
  @IsBoolean()
  isDone: boolean;
}
