import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './model/user.model';

@Injectable()
export class RecordsService{

    URL = 'https://reqres.in/api/users/';
    usersChanged = new Subject<User[]>();
    userOb= new Subject<number>();
    user: User;

    public users: User[] = [
        /* new User(
            'Yash',
            'Patel'),
        new User(
            'Khalak',
            'Nathvani') */
    ];

    constructor(private http: HttpClient){}

    public getUsers(): void{
        //return this.users.slice();
        
        this.users.length=0;
        this.http
        .get(this.URL)
        .subscribe(
            responceData => {
                const user = responceData['data'];
                this.userOb.next(responceData['total_pages']);
                for (const i in  user){
                    this.users.push(
                        new User(user[i]['id'],
                                user[i]['first_name'],
                                user[i]['last_name'],
                                user[i]['avatar'])
                        );
                }
        });
    }

    public getUser(index: number): User{
        return this.users[index];
    }

    public addUser(user: User): void{
        /* this.users.push(user);
        this.usersChanged.next(this.users.slice()); */
        
        this.http
        .post(this.URL,user)
        .subscribe(responceData => {
            console.log(responceData);
        });
    }

    public updateUser(index: number, newUser: User): void{
        /* this.users[index] = newUser;
        this.usersChanged.next(this.users.slice()); */
        
        this.http
        .put(this.URL+index,newUser)
        .subscribe(responceData =>{
            console.log(responceData);
        });
    }

    public deleteUser(index: number): void{
        if(confirm("Are you sure you want to delete this?")){
            /* this.users.splice(index,1);
            this.usersChanged.next(this.users.slice()); */

            this.http.delete(this.URL+index)
            .subscribe(responceData => { 
                console.log(responceData) ;
            });
        }        
    }

    public updatePageInfo(pageNo: any): void{
        this.users.length = 0;
        this.http
        .get(this.URL+ '?page=' + pageNo)
        .subscribe(
            response => {
            const user = response['data'];
            this.userOb.next(response['total_pages']);
            for (const i in user) {
                this.users.push(
                    new User(user[i]['id'], 
                            user[i]['first_name'], 
                            user[i]['last_name'], 
                            user[i]['avatar']));
            }
        });
    }  
}