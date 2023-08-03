import { EnvironmentPlugin } from 'webpack';
require('dotenv').config();

export const plugins = [
	new EnvironmentPlugin([
		'PROJECT_ID',
		'APP_ID',
		'DATABASE_URL',
		'STORAGE_BUCKET',
		'API_KEY',
		'AUTH_DOMAIN',
		'MESSAGING_SENDER_ID',
	]),
];
