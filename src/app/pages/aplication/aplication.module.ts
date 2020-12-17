import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AplicationRoutingModule } from './aplication-routing.module';
import { MainComponent } from '../main/main.component';
import { EditComponent } from '../edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from '../create/create.component';

@NgModule({
  declarations: [
    MainComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    AplicationRoutingModule,
    ReactiveFormsModule
  ]
})
export class AplicationModule { }
