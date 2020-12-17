import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { TodosService } from '../../services/resolvers/todos.service';
import { TodoDetailService } from '../../services/resolvers/todo-detail.service';
import { EditComponent } from '../edit/edit.component';
import { CreateComponent } from '../create/create.component';

const routes: Routes = [
  { path: '', component: MainComponent,
    resolve: {
      todos: TodosService
    }
  },
  { path: 'edit/:id', component: EditComponent,
    resolve: {
      todo: TodoDetailService
    }
  },
  {
    path: 'create', component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicationRoutingModule { }
