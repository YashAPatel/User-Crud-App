export class User{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;

    constructor(id: string,firstName: string, lastName: string,avatar: string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
    } 
}