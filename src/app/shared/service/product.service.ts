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
	DocumentReference,
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

	add(newProduct: IProduct): Promise<DocumentReference<IProduct>> {
		const docRef = addDoc(this.collectionInstance, newProduct);

		return docRef as Promise<DocumentReference<IProduct>>;
	}

	deleteById = (productId: string): Promise<void> => {
		const docInstance = doc(this.firestore, 'products', productId);
		return deleteDoc(docInstance);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateById = (productId: string, newDatas: any) => {
		const docInstance = doc(this.firestore, 'products', productId);
		return updateDoc(docInstance, newDatas);
	};
}
