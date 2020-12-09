import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RecordListComponent } from './record-list/record-list.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '',  redirectTo: '/recordlist', pathMatch: 'full'},
  { path: 'recordlist', component: RecordListComponent},
  { path: 'recordlist/new', component: AddRecordComponent},
  { path: 'recordlist/:id', component: AddRecordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
