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
import { IProduct } from '@shared/model/product.model';

@Injectable({
	providedIn: 'root',
})
export class UserListService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'users');
	}

	async getListProductsByUserId(userId: string): Promise<IProduct[]> {
		const docInstance = doc(this.firestore, 'users', userId);
		const docRef = await getDoc(docInstance);

		return docRef.data()?.['list'];
	}

	addProductInList = (userId: string, product: IProduct): Promise<void> => {
		const docInstance = doc(this.firestore, 'users', userId);
		return updateDoc(docInstance, { list: arrayUnion(product) });
	};

	deleteProductInList = (userId: string, product: IProduct): Promise<void> => {
		const docInstance = doc(this.firestore, 'users', userId);
		return updateDoc(docInstance, { list: arrayRemove(product) });
	};
}
