import { Injectable } from '@angular/core';
import { ChoiceItemType, ColorItemType } from '../interfaces/input.interface';
import { ProductSizeEnum } from '../enum/product.enum';
import {
	ITableColumns,
	IRowsPerPageSelectOptions,
} from '../interfaces/table.interface';
import { ISocialProvider } from '../model/social-provider.model';
import { ProviderEnum } from '../enum/provider.enum';
import { INavLink } from '../interfaces/link.interface';
import { StatusEnum } from '../enum/form.enum';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	getAllSizes(): ChoiceItemType[] {
		return [
			{
				name: ProductSizeEnum.XXS,
				value: ProductSizeEnum.XXS,
				label: ProductSizeEnum.XXS,
			},
			{
				name: ProductSizeEnum.XS,
				value: ProductSizeEnum.XS,
				label: ProductSizeEnum.XS,
			},
			{
				name: ProductSizeEnum.S,
				value: ProductSizeEnum.S,
				label: ProductSizeEnum.S,
			},
			{
				name: ProductSizeEnum.M,
				value: ProductSizeEnum.M,
				label: ProductSizeEnum.M,
			},
			{
				name: ProductSizeEnum.L,
				value: ProductSizeEnum.L,
				label: ProductSizeEnum.L,
			},
			{
				name: ProductSizeEnum.XL,
				value: ProductSizeEnum.XL,
				label: ProductSizeEnum.XL,
			},
			{
				name: ProductSizeEnum.XXL,
				value: ProductSizeEnum.XXL,
				label: ProductSizeEnum.XXL,
			},
			{
				name: ProductSizeEnum.XXXL,
				value: ProductSizeEnum.XXXL,
				label: ProductSizeEnum.XXXL,
			},
		];
	}

	getAllStatus(): ChoiceItemType[] {
		return [
			{
				id: StatusEnum.INACTIVE,
				name: StatusEnum.INACTIVE,
				label: StatusEnum.INACTIVE,
				value: StatusEnum.INACTIVE,
			},
			{
				id: StatusEnum.ACTIVE,
				name: StatusEnum.ACTIVE,
				label: StatusEnum.ACTIVE,
				value: StatusEnum.ACTIVE,
			},
		];
	}

	getAllColors(): ColorItemType[] {
		return [
			{
				color: '#f87575',
				value: 'red',
				label: 'red',
				name: 'red',
				severity: 'danger',
			},
			{
				color: '#5c95ff',
				value: 'blue',
				label: 'blue',
				name: 'blue',
				severity: 'info',
			},
			{
				color: '#2EC12B',
				value: 'green',
				label: 'green',
				name: 'green',
				severity: 'success',
			},
			{
				color: '#FFFF5C',
				value: 'yellow',
				label: 'yellow',
				name: 'yellow',
				severity: 'warning',
			},
			{
				color: '#952265',
				value: 'purple',
				label: 'purple',
				name: 'purple',
				severity: 'help',
			},
		];
	}

	getColsCategories(): ITableColumns[] {
		return [
			{
				field: 'id',
				header: 'ID',
			},
			{
				field: 'name',
				header: 'Name',
			},
			{
				field: 'description',
				header: 'Description',
			},
			{
				field: 'status',
				header: 'Status',
			},
		];
	}

	getColsProducts(): ITableColumns[] {
		return [
			{
				field: 'modelName',
				header: 'Model name',
			},
			{
				field: 'brandName',
				header: 'Brand name',
			},
			{
				field: 'category',
				header: 'Category',
			},
			{
				field: 'size',
				header: 'Size',
			},
			{
				field: 'quantity',
				header: 'Quantity',
			},
			{
				field: 'color',
				header: 'Color',
			},
			{
				field: 'price',
				header: 'Price',
			},
			{
				field: 'status',
				header: 'Status',
			},
		];
	}

	getDashboardNavLinks(): INavLink[] {
		return [
			{
				label: 'Dashboard',
				routerLink: '/dashboard/home',
				icon: 'fa-solid fa-chart-simple',
			},
			{
				label: 'Products',
				routerLink: '/dashboard/products',
				icon: 'fa-solid fa-cart-shopping',
			},
			{
				label: 'Categories',
				routerLink: '/dashboard/categories',
				icon: 'fa-solid fa-tags',
			},
		];
	}

	getAuthProviders(): ISocialProvider[] {
		return [
			{
				label: 'Connect with Google',
				icon: 'fa-brands fa-google',
				color: 'primary',
				size: '100%',
				outline: false,
				name: ProviderEnum.GOOGLE,
			},
			{
				label: 'Connect with Github',
				icon: 'fa-brands fa-github',
				color: 'primary',
				size: '100%',
				outline: false,
				name: ProviderEnum.GITHUB,
			},
		];
	}

	getRowsPerPageSelectOptions(): IRowsPerPageSelectOptions[] {
		return [
			{ label: 5, value: 5 },
			{ label: 10, value: 10 },
			{ label: 25, value: 25 },
			{ label: 50, value: 50 },
		];
	}
}
