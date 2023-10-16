export class ServiceResponse {
    Success: boolean
    Code: number;

    Data: any;

    TotalCount: number;

    ErrorMessage: string;

    UserMessage: string;

    DevMessage: string;

    constructor() {
        this.Success = true
        this.Code = 0;
        this.Data = null;
        this.TotalCount = 0;
        this.ErrorMessage = '';
        this.UserMessage = '';
        this.DevMessage = '';
    }
}
