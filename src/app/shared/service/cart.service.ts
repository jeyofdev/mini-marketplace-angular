import { Injectable } from '@angular/core';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	addDoc,
	DocumentReference,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { IProduct } from '../model/product.model';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'cart');
	}

	addItemToCart(
		product: Partial<IProduct>,
	): Promise<DocumentReference<Partial<IProduct>>> {
		const docRef = addDoc(this.collectionInstance, product);

		return docRef as Promise<DocumentReference<IProduct>>;
	}
}
