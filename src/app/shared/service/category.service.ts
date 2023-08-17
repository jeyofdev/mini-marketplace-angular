import { Injectable } from '@angular/core';
import { ICategory } from '../model/category.model';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	addDoc,
	collectionData,
	doc,
	deleteDoc,
	updateDoc,
	DocumentReference,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'categories');
	}

	getAll(): Observable<ICategory[]> {
		return collectionData(this.collectionInstance, {
			idField: 'id',
		}) as Observable<ICategory[]>;
	}

	add(newCategory: ICategory): Promise<DocumentReference<ICategory>> {
		const docRef = addDoc(this.collectionInstance, newCategory);

		return docRef as Promise<DocumentReference<ICategory>>;
	}

	deleteById = (categoryId: string) => {
		const docInstance = doc(this.firestore, 'categories', categoryId);
		deleteDoc(docInstance);
	};

	updateById = (categoryId: string, newDatas: Partial<ICategory>) => {
		const docInstance = doc(this.firestore, 'categories', categoryId);
		return updateDoc(docInstance, newDatas);
	};
}
