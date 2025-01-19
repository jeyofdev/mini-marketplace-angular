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
import { IUser } from '@core/model/user.model';
import { from, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserInformationsService {
	private collectionInstance!: CollectionReference<DocumentData>;

	constructor(private firestore: Firestore) {
		this.collectionInstance = collection(this.firestore, 'users');
	}

	getUserById(userId: string): Observable<IUser> {
		const docInstance = doc(this.firestore, 'users', userId);
		return from(
			getDoc(docInstance).then(docRef => {
				if (docRef.exists()) {
					return docRef.data() as IUser;
				} else {
					throw new Error('User does not exist');
				}
			}),
		);
	}

	addUser(userId: string, newUser: IUser): Observable<void> {
		const docInstance = doc(this.firestore, 'users', userId);
		return from(setDoc(docInstance, newUser));
	}
}
