export interface IApiError{
    statusCode:number;
    success:boolean;
    data:any;
    errors:Array<Error>;
}
export class ApiError extends Error implements IApiError{
    statusCode:number;
    success:boolean;
    data:any;
    errors:Array<Error>;

    constructor(
        statusCode:number,
        message:string="Something went wrong",
        errors:Array<Error>=[],
        stack=""
    ){
        super(message);
        this.statusCode=statusCode;
        this.message=message;
        this.success=false;
        this.data=null;
        this.errors=errors;
        
        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}