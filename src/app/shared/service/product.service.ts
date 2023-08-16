import { Injectable } from '@angular/core';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	addDoc,
	collectionData,
	doc,
	deleteDoc,
	updateDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { IProduct } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'products');
	}

	getAll(): Observable<IProduct[]> {
		return collectionData(this.collectionInstance, {
			idField: 'id',
		}) as Observable<IProduct[]>;
	}

	add(newProduct: IProduct) {
		const docRef = addDoc(this.collectionInstance, newProduct);

		return docRef;
	}

	deleteById = (productId: string) => {
		const docInstance = doc(this.firestore, 'products', productId);
		deleteDoc(docInstance);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateById = (productId: string, newDatas: any) => {
		const docInstance = doc(this.firestore, 'products', productId);
		return updateDoc(docInstance, newDatas);
	};
}
