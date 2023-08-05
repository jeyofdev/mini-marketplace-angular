/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { ICategory } from '../model/category.model';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	addDoc,
} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { collection } from '@firebase/firestore';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(
		private httpClient: HttpClient,
		private firestore: Firestore,
	) {
		this.collectionInstance = collection(this.firestore, 'categories');
	}

	add(newCategory: ICategory) {
		addDoc(this.collectionInstance, newCategory)
			.then(() => {
				console.log('category save successfully');
			})
			.catch(err => {
				console.log(err);
			});
	}
}
