import { UserInformationsActions } from '@core/state/user/actions/user-informations.actions';
import { UserListActions } from '@core/state/user/actions/user-list.actions';

export const UserActions = {
	informations: UserInformationsActions,
	list: UserListActions,
};
