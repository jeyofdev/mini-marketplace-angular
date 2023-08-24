import { createFeatureSelector } from '@ngrx/store';
import { IWebState, webFeatureKey } from '../reducers/web.reducer';

export const SELECT_WEB_FEATURE =
	createFeatureSelector<IWebState>(webFeatureKey);
