export interface IUser {
    email: string; 
    id: number;
    token: string;
}

export interface IUserData {
    email: string;
    password: string;
}

export interface IResponseUser {
    email: string; 
    id: number;
    password: string;
    createdAt: string;
    updateAt: string;
}

export interface IResponseData {
    token: string;
    user: IResponseUser;
}