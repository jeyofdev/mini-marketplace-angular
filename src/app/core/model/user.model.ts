import { IProduct } from '../../shared/model/product.model';

export interface IUser {
	account: IUserAccount;
	profile: IUserProfile;
	list: IProduct[];
}

export interface IUserProfile {
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	phone: string;
	avatar: string;
}

export interface IUserAccount {
	lastLogin: string;
	createdAt: string;
}
