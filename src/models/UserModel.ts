import { BaseModel } from '.';

export class UserModel extends BaseModel {
    UserId: string;
    UserName?: string;
    Age?: number;
    Gender?: number;
    PhoneNumber?: string;
    Address?: string;
    Account: string;
    Passwords: string;

    constructor() {
        super();
        this.UserId = '';
        this.UserName = '';
        this.Age = 0;
        this.Gender = 2;
        this.PhoneNumber = '';
        this.Address = '';
        this.Account = '';
        this.Passwords = '';
    }
}
