import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Todo} from '../models/Todo';
import {catchError} from 'rxjs/operators';
import { TokenStorageService } from '../auth/token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosUrl = 'http://localhost:8080/todos';

  constructor(private http: HttpClient,private tokenStorageService : TokenStorageService) {}

  // get all todos
  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.todosUrl)
      .pipe(catchError(this.handleError));
  }

  // delete the _todo with the passed id
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http
      .delete<Todo>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // add the passed observable
  addTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(this.todosUrl, todo, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // toggle completion of the passed observable
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http
      .put(url, todo, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // update the title of existing _todo
  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http
      .put<Todo>(url, todo, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // get _todo by ID
  getTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
      if(error.status == 401){
        this.tokenStorageService.signOut();
      }
    }

    return throwError('Something bad happened; please try again later.');
  }
}
