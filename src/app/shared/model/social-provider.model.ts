import { ThemePalette } from '@angular/material/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

export interface ISocialProvider {
	label: string;
	color: ThemePalette;
	icon: IconDefinition;
	size: string;
	outline: boolean;
}
