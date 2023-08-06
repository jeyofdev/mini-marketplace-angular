import { ProviderEnum } from 'src/app/shared/enum/provider.enum';
import { ISocialProvider } from './../../shared/model/social-provider.model';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

export const getAuthProviders: ISocialProvider[] = [
	{
		label: 'Connect with Google',
		icon: faGoogle,
		color: 'primary',
		size: '100%',
		outline: false,
		name: ProviderEnum.GOOGLE,
	},
	{
		label: 'Connect with Github',
		icon: faGithub,
		color: 'primary',
		size: '100%',
		outline: false,
		name: ProviderEnum.GITHUB,
	},
];

export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
