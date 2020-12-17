import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecordsService } from '../service/records.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit, OnDestroy {

  private id: number;
  public editMode=false;
  public userForm: FormGroup;
  private subscription: Subscription;
  private user: User;

  constructor(private route: ActivatedRoute,
    private recordsService: RecordsService,
    private router: Router) { }

    ngOnInit(): void {
      this.subscription = this.route.params 
        .subscribe(
          (params: Params) => {
            if(params['id']==='new')
            {
              this.initForm();
            } else {
              this.id = +params['id'];
              this.editMode = params['id'] != null;
              this.initForm();
            }
          }
        ); 
    }

  public onSubmitForm(): void{
    if(this.editMode){
      this.editMode=false;
      this.recordsService
        .updateUser(this.id, this.userForm.value)
        .subscribe(responceData =>{
          console.log(responceData);
        });
    } else {
      this.recordsService
        .addUser(this.userForm.value)
        .subscribe(
          responceData => {
            console.log(responceData);
        });
    }
    this.onCancel();
  }

  public onCancel(): void{
    this.editMode=false;
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  private initForm(): void{
    let firstName: string;
    let lastName: string;
    if(this.editMode){
      this.user=this.recordsService.getUser(this.id);
      firstName=this.user.first_name;
      lastName=this.user.last_name;
    }
    this.userForm = new FormGroup({
      'firstName': new FormControl(firstName,Validators.required),
      'lastName': new FormControl(lastName,Validators.required)
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
