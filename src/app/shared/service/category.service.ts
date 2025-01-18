import { Injectable } from '@angular/core';
import { ICategory, ISaveCategory } from '@shared/model/category.model';
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
import {
	collection,
	FirestoreDataConverter,
	PartialWithFieldValue,
} from '@firebase/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private collectionInstance!: CollectionReference<ICategory>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(
			this.firestore,
			'categories',
		).withConverter(this.categoryConverter());
	}

	getAll(): Observable<ICategory[]> {
		return collectionData(this.collectionInstance, {
			idField: 'id',
		}) as Observable<ICategory[]>;
	}

	add(newCategory: ISaveCategory): Observable<DocumentReference<ICategory>> {
		const docRef: Promise<DocumentReference<DocumentData>> = addDoc(
			this.collectionInstance,
			newCategory,
		);

		return from(docRef).pipe(
			map(ref => {
				return ref as DocumentReference<ICategory>;
			}),
		);
	}

	deleteById = (categoryId: string): Observable<void> => {
		const docInstance = doc(this.firestore, 'categories', categoryId);
		return from(deleteDoc(docInstance));
	};

	updateById = (
		categoryId: string,
		newDatas: Partial<ISaveCategory>,
	): Observable<void> => {
		const docInstance = doc(this.firestore, 'categories', categoryId);
		return from(updateDoc(docInstance, newDatas));
	};

	private categoryConverter(): FirestoreDataConverter<ICategory> {
		return {
			toFirestore(
				category: PartialWithFieldValue<ISaveCategory>,
			): DocumentData {
				return {
					name: category.name,
					description: category.description,
					status: category.status,
				};
			},
			fromFirestore(snapshot): ICategory {
				const data = snapshot.data();
				return {
					id: snapshot.id,
					name: data['name'],
					description: data['description'],
					status: data['status'],
				};
			},
		};
	}
}
