export interface ICategory {
	id: string;
	name: string;
	description: string;
	status: string;
}

export type ISaveCategory = Omit<ICategory, 'id'>;
