import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoDetailService {

  constructor(private api:ApiService) { }

  resolve(router: ActivatedRouteSnapshot){
      console.log(router.params['id']);
      return this.api.taskDetail(router.params['id']).pipe(
        map((res:any)=> res),
        catchError((error)=>{
          return of([]);
        })
      );
  }
}
