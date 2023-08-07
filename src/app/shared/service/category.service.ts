import { Injectable } from '@angular/core';
import { ICategory } from '../model/category.model';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	addDoc,
	collectionData,
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

	add(newCategory: ICategory) {
		const docRef = addDoc(this.collectionInstance, newCategory);

		return docRef;
	}
}