import { Injectable } from '@angular/core';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	addDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { IProduct } from '../model/product.model';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'products');
	}

	add(newProduct: IProduct) {
		const docRef = addDoc(this.collectionInstance, newProduct);

		return docRef;
	}
}
