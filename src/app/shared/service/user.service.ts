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
import { IProduct } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'users');
	}

	getAllProductInList(): Observable<IProduct[]> {
		return collectionData(this.collectionInstance, {
			idField: 'id',
		}) as Observable<IProduct[]>;
	}

	addProductInList(product: IProduct): Promise<DocumentReference<IProduct>> {
		const docRef = addDoc(this.collectionInstance, product);

		return docRef as Promise<DocumentReference<IProduct>>;
	}
}
