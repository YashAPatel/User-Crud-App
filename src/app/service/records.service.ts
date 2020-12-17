import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User, UserDetails } from '../model/user.model';

@Injectable()
export class RecordsService{

    URL = 'https://reqres.in/api/users/';
    usersChanged = new Subject<User[]>();
    user: User;
    public users: User[] = [];

    constructor(private http: HttpClient){}

    public getUsersFromPage(page: number): Observable<UserDetails>{
        return this.http.get<UserDetails>(this.URL + '?page=' + page);
    }

    public getUser(index: number): User{
        return this.users[index];
    }

    public setUsers(users : User[]): void {
        this.users=users;
    }

    public addUser(user: User): Observable<User>{
        /* this.users.push(user);
        this.usersChanged.next(this.users.slice()); */
        
        return this.http.post<User>(this.URL,user);
    }

    public updateUser(index: number, newUser: User): Observable<User>{
        /* this.users[index] = newUser;
        this.usersChanged.next(this.users.slice()); */
        
        return this.http.put<User>(this.URL+index,newUser);
    }

    public deleteUser(index: number): void{
        if(confirm("Are you sure you want to delete this?")){
            console.log(this.users[index].first_name+' '+this.users[index].last_name+' is Deleted.');
            this.users.splice(index,1);
            this.usersChanged.next(this.users.slice()); 
            this.http.delete(this.URL+index);
        }        
    } 
}