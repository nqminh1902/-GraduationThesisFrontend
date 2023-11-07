import { StateEnum } from "@/enums";

export class BaseModel {
    CreatedDate?: string;
    CreatedBy?: string;
    ModifiedDate?: string;
    ModifiedBy?: string;
    State?: StateEnum = StateEnum.Insert
}

