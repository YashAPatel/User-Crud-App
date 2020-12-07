import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecordsService } from '../records.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  //user: User;
  private id: number;
  public currentPage : number = 1;
  public totalPages: number[] =[];
  subscription: Subscription;
  
  constructor(private recordsService: RecordsService,
              private route: ActivatedRoute,
              private router: Router) {
                this.subscription=this.recordsService.userOb.subscribe(pages => {
                  this.totalPages= Array(pages).fill(0).map((x, i) => i + 1);
                }) 
               }

  ngOnInit(): void {
    this.recordsService.getUsers();
    this.users=this.recordsService.users;
  }

  public onEditUser(id: number): void{
/*     this.router.navigateByUrl(`/recordlist/${id}`);*/
    this.router.navigate([id], {relativeTo: this.route});
 }
  
  public onDeleteUser(id: number): void{
    this.recordsService.deleteUser(id);
    this.router.navigate(['/recordlist']);
  }

  public changePage(pageNo : number): void{
    this.currentPage=pageNo;
    this.recordsService.updatePageInfo(pageNo);
  } 

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
