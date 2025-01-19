import { Injectable } from '@angular/core';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	doc,
	updateDoc,
	arrayUnion,
	arrayRemove,
	getDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { IProduct, ISaveProduct } from '@shared/model/product.model';
import { from, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserListService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'users');
	}

	getListProductsByUserId(userId: string): Observable<IProduct[]> {
		const docInstance = doc(this.firestore, 'users', userId);
		return from(
			getDoc(docInstance).then(docRef => docRef.data()?.['list'] || []),
		);
	}

	addProductInList = (
		userId: string,
		product: ISaveProduct,
	): Observable<void> => {
		const docInstance = doc(this.firestore, 'users', userId);
		return from(updateDoc(docInstance, { list: arrayUnion(product) }));
	};

	deleteProductInList = (
		userId: string,
		product: IProduct,
	): Observable<void> => {
		const docInstance = doc(this.firestore, 'users', userId);
		return from(updateDoc(docInstance, { list: arrayRemove(product) }));
	};
}
