import { Injectable } from '@angular/core';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	addDoc,
	DocumentReference,
	collectionData,
	doc,
	setDoc,
	getDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { IProduct } from '../../shared/model/product.model';
import { IUser } from '../model/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'users');
	}

	async getUserById(userId: string): Promise<IUser> {
		const docInstance = doc(this.firestore, 'users', userId);
		const docRef = await getDoc(docInstance);

		if (docRef.exists()) {
			return docRef.data() as Promise<IUser>;
		} else {
			throw new Error('User does not exist');
		}
	}

	async addUser(userId: string, newUser: IUser): Promise<void> {
		return setDoc(doc(this.firestore, 'users', userId), newUser);
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
