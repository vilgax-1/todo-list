import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { catchError, map, pluck } from 'rxjs/operators';
import { Todo } from '../../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private api: ApiService) {}

  resolve(){
    return this.api.getTodoList().pipe(
      map((res: any) => res),
      catchError((error) =>{
        return of([]);
      })
    );
  }
}
