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
import {
	collection,
	FirestoreDataConverter,
	PartialWithFieldValue,
} from '@firebase/firestore';
import { IProduct, ISaveProduct } from '@shared/model/product.model';
import { from, map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(
			this.firestore,
			'products',
		).withConverter(this.productConverter());
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

	add(newProduct: ISaveProduct): Observable<DocumentReference<IProduct>> {
		const docRef: Promise<DocumentReference<DocumentData>> = addDoc(
			this.collectionInstance,
			newProduct,
		);

		return from(docRef).pipe(
			map(ref => {
				return ref as DocumentReference<IProduct>;
			}),
		);
	}

	deleteById = (productId: string): Observable<void> => {
		const docInstance = doc(this.firestore, 'products', productId);
		return from(deleteDoc(docInstance));
	};

	updateById = (
		productId: string,
		newDatas: Partial<IProduct>,
	): Observable<void> => {
		const docInstance = doc(this.firestore, 'products', productId);
		return from(updateDoc(docInstance, newDatas));
	};

	private productConverter(): FirestoreDataConverter<IProduct> {
		return {
			toFirestore(product: PartialWithFieldValue<ISaveProduct>): DocumentData {
				return {
					brandName: product.brandName,
					modelName: product.modelName,
					category: product.category,
					size: product.size,
					quantity: product.quantity,
					price: product.price,
					color: product.color,
					options: product.options,
					status: product.status,
				};
			},
			fromFirestore(snapshot): IProduct {
				const data = snapshot.data();
				return {
					id: snapshot.id,
					brandName: data['brandName'],
					modelName: data['modelName'],
					category: data['category'],
					size: data['size'],
					quantity: data['quantity'],
					price: data['price'],
					color: data['color'],
					options: data['options'],
					status: data['status'],
				};
			},
		};
	}
}
