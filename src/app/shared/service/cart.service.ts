import { Injectable } from '@angular/core';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	addDoc,
	DocumentReference,
	collectionData,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { ICartProduct } from '../model/cart.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'cart');
	}

	getAllProductsInCart(): Observable<ICartProduct[]> {
		return collectionData(this.collectionInstance, {
			idField: 'id',
		}) as Observable<ICartProduct[]>;
	}

	addProductToCart(
		product: ICartProduct,
	): Promise<DocumentReference<ICartProduct>> {
		const docRef = addDoc(this.collectionInstance, product);

		return docRef as Promise<DocumentReference<ICartProduct>>;
	}
}
