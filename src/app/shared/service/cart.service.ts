import { Injectable } from '@angular/core';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	addDoc,
	DocumentReference,
	collectionData,
	doc,
	deleteDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import {
	ICartDelivery,
	ISaveCartDelivery,
} from '@shared/model/cart/cart-delivery.model';
import {
	ICartProduct,
	ISaveCartProduct,
} from '@shared/model/cart/cart-product.model';
import { from, map, Observable } from 'rxjs';

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
		product: ISaveCartProduct,
	): Observable<DocumentReference<ICartProduct>> {
		const docRef = addDoc(this.collectionInstance, product);

		return from(docRef).pipe(
			map(ref => {
				return ref as DocumentReference<ICartProduct>;
			}),
		);
	}

	deleteProductById = (productId: string): Observable<void> => {
		const docInstance = doc(this.firestore, 'cart', productId);
		return from(deleteDoc(docInstance));
	};

	addDeliveryToCart(
		delivery: ISaveCartDelivery,
	): Observable<DocumentReference<ICartDelivery>> {
		const docRef = addDoc(this.collectionInstance, delivery);

		return from(docRef).pipe(
			map(ref => {
				return ref as DocumentReference<ICartDelivery>;
			}),
		);
	}
}
