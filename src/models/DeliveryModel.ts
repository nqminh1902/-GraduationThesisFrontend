import { BaseModel } from '.';

export class DeliveryModel extends BaseModel {
    DeliveryID: number;
    UserID: number;
    UserName: string;
    Email: string;
    MobilePhone: number;
    CityName: string;
    DistrictName: string;
    WardName: string;
    Address: string;

    constructor() {
        super();
        this.DeliveryID = 0;
        this.UserID = 0;
        this.UserName = '';
        this.Email = '';
        this.MobilePhone = 0;
        this.CityName = '';
        this.DistrictName = '';
        this.WardName = '';
        this.Address = '';
    }
}
