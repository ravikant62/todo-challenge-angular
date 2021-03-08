import { TodoList } from './TodoList';

export class Todo {
  id: number;
  text: string;
  completed: boolean;
  lastUpdated: string;
  todolist: TodoList;
}
