import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordListComponent } from './record-list/record-list.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { CommonModule } from '@angular/common';
import { RecordsService } from './service/records.service';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    RecordListComponent,
    AddRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  exports: [FormsModule],
  providers: [RecordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
