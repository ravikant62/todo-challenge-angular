import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../../models/Todo';
import {TodoService} from '../../services/todo.service';
import { text } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  editTodoForm: FormGroup;
  lastUpdated : string;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.editTodoForm = this.formBuilder.group({
      text: [
        this.todo.text,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
        ]
      ]
    });
    this.lastUpdated = this.formatDate(new Date(this.todo.lastUpdated).toLocaleString());
  }

  setClasses() {
    return {
      todo: true,
      'is-complete': this.todo ? this.todo.completed : false
    };
  }

  onSave(todo: Todo, newText: string) {
    // check if no change or no length
    if (this.todo.text === newText || newText.length === 0) {
      console.log('Todo not updated.');
      return;
    }

    // update on client side memory
    this.todo.text = newText;

    // update on server
    this.todoService.updateTodo(todo).subscribe(response => {
      this.lastUpdated = this.formatDate(new Date(response.lastUpdated).toLocaleString());
    });
  }

  onDelete(todo: Todo) {
    // deletes and emit
    this.deleteTodo.emit(todo);
  }

  formatDate(date : string): string{
      let index=0;
      for(let i= date.length -1; i>=0; i--){
        console.log('check')
        if(date[i] === ':'){
          index = i;
          break;
        }
      }
      return date.substr(0, index);
  }

  onToggle(todo: Todo) {
    // toggles UI
    todo.completed = !todo.completed;

    // toggles Server
    this.todoService.toggleCompleted(todo).subscribe(td => {
      this.lastUpdated = this.formatDate(new Date(td.lastUpdated).toLocaleString());
    });
  }
}
