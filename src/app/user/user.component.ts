import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {TodoList} from '../models/TodoList';
import {TodoListService} from '../services/todo-list.service';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  lists: TodoList[] = [];

  constructor(private tokenStorage: TokenStorageService, private todoListService: TodoListService) { }

  ngOnInit() {

    this.user = {
      id : Number(this.tokenStorage.getUserId()),
      username : this.tokenStorage.getUsername(),
      roles : this.tokenStorage.getAuthorities(),
      active : true
    }
    this.todoListService.getTodoLists().subscribe(lists => {
      this.lists = lists.filter(ls => ls.user.id === this.user.id);
    });
  }

  deleteList(list: TodoList) {
    this.todoListService.deleteTodoList(list).subscribe(() => {
      this.lists = this.lists.filter(ls => ls.id !== list.id);
    });
  }

  addList(list: TodoList) {
    this.todoListService.addTodoList(list).subscribe(ls => {
      this.lists.push(ls);
    });
  }

  trackByLists(index: number, list: TodoList): number {
    return list.id;
  }
}
