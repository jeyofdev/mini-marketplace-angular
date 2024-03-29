import { Injectable } from '@angular/core';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	addDoc,
	collectionData,
	doc,
	getDoc,
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

	async getById(productId: string) {
		const docInstance = doc(this.firestore, 'products', productId);
		const docRef = await getDoc(docInstance);

		if (docRef.exists()) {
			return docRef.data() as Promise<IProduct>;
		} else {
			throw new Error('Document does not exist');
		}
	}

	add(newProduct: IProduct): Promise<DocumentReference<IProduct>> {
		const docRef = addDoc(this.collectionInstance, newProduct);

		return docRef as Promise<DocumentReference<IProduct>>;
	}

	deleteById = (productId: string): Promise<void> => {
		const docInstance = doc(this.firestore, 'products', productId);
		return deleteDoc(docInstance);
	};

	updateById = (
		productId: string,
		newDatas: Partial<IProduct>,
	): Promise<void> => {
		const docInstance = doc(this.firestore, 'products', productId);
		return updateDoc(docInstance, newDatas);
	};
}
