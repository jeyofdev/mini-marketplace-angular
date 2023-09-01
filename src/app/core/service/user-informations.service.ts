import { Injectable } from '@angular/core';
import {
	CollectionReference,
	DocumentData,
	Firestore,
	doc,
	setDoc,
	getDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { IUser } from '../model/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserInformationsService {
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
}
