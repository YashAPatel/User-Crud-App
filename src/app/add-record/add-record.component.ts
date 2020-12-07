import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecordsService } from '../records.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit, OnDestroy {

  public firstName: string;
  public lastName: string;
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
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.initForm();
          }
        ); 
    }
  public onSubmitForm(): void{
    if(this.editMode){
      this.editMode=false;
      this.recordsService.updateUser(this.id, this.userForm.value);
    } else {
      this.recordsService.addUser(this.userForm.value);
    }
    this.onCancel();
  }

  public onCancel(): void{
    this.editMode=false;
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  private initForm(): void{
    if(this.editMode){
      this.user=this.recordsService.getUser(this.id);
      this.firstName=this.user.firstName;
      this.lastName=this.user.lastName;
    }
    this.userForm = new FormGroup({
      'firstName': new FormControl(this.firstName,Validators.required),
      'lastName': new FormControl(this.lastName,Validators.required)
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
