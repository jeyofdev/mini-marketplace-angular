export interface ICartDelivery {
	id?: string;
	firstname: string;
	lastname: string;
	phone: string;
	email: string;
	city: string;
	country: string;
	postalCode: string;
	address: string;
}

export type ISaveCartDelivery = Omit<ICartDelivery, 'id'>;
