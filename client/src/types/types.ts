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

export interface ICategory {
    title: string;
    id: number;
    createdAt: string;
    updatedt: string;
    transactions: [];
}

