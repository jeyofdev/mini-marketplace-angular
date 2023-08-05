import { Injectable } from '@angular/core';
import { ICategory } from '../model/category.model';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	addDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'categories');
	}

	add(newCategory: ICategory) {
		const docRef = addDoc(this.collectionInstance, newCategory);

		return docRef;
	}
}
