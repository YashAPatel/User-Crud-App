import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, UserDetails } from './model/user.model';

@Injectable()
export class RecordsService{

    URL = 'https://reqres.in/api/users/';
    usersChanged = new Subject<User[]>();
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

    public getUsersFromPage(page: number): Observable<UserDetails>{
        //return this.users.slice();
        
        return this.http.get<UserDetails>(this.URL + '?page=' + page);
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
            this.users.splice(index,1);
            this.usersChanged.next(this.users.slice()); 

            this.http.delete(this.URL+index)
            .subscribe(responceData => { 
                console.log(responceData) ;
            });
        }        
    } 
}