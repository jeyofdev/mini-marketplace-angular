import { ThemePalette } from '@angular/material/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { ProviderEnum } from '../enum/provider.enum';

export interface ISocialProvider {
	label: string;
	color: ThemePalette;
	icon: IconDefinition;
	size: string;
	outline: boolean;
	name: ProviderEnum;
}
