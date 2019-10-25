declare namespace Express {
    export interface User {
        _id: string;
    }
    export interface Request {
        user?: User;
    }
}
