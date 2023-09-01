import { Injectable } from '@angular/core';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	doc,
	updateDoc,
	arrayUnion,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { IProduct } from '../../shared/model/product.model';

@Injectable({
	providedIn: 'root',
})
export class UserListService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'users');
	}

	addProductInList = (userId: string, product: IProduct): Promise<void> => {
		const docInstance = doc(this.firestore, 'users', userId);
		return updateDoc(docInstance, { list: arrayUnion(product) });
	};
}
