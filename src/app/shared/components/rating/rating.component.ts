import {
	Component,
	EventEmitter,
	Input,
	Output,
	OnChanges,
	OnInit,
} from '@angular/core';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, OnChanges {
	@Input() value!: number;
	@Input() iconEmpty!: string;
	@Input() iconFill!: string;
	@Input() color!: 'primary' | 'success' | 'info' | 'warning' | 'danger';
	@Input() size!: 'normal' | 'large' | 'small';

	iconsSize!: number;
	iconsContainerWidth!: number;
	iconNumberArr!: number[];
	classIconFill!: string;
	classIconEmpty!: string;

	@Output() starRatingClicked: EventEmitter<string> =
		new EventEmitter<string>();

	ngOnInit(): void {
		this.iconNumberArr = Array(5).fill(5);
		this.classIconEmpty = `${this.iconEmpty} icon`;
		this.classIconFill = `${this.iconFill} icon`;

		if (this.color) {
			this.classIconEmpty += ` icon-empty-${this.color}`;
			this.classIconFill += ` icon-fill-${this.color}`;
		}

		if (this.size) {
			this.classIconEmpty += ` icon-${this.size}`;
			this.classIconFill += ` icon-${this.size}`;
		}
	}

	ngOnChanges(): void {
		this.iconsContainerWidth = (this.value * 80) / 5;
	}

	sendRating(): void {
		this.starRatingClicked.emit(`La note est de ${this.value}`);
	}
}
