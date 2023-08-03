/* eslint-disable @typescript-eslint/dot-notation */
export const environment = {
	production: true,
	firebase: {
		projectId: process.env['PROJECT_ID'],
		appId: process.env['APP_ID'],
		databaseURL: process.env['DATABASE_URL'],
		storageBucket: process.env['STORAGE_BUCKET'],
		apiKey: process.env['API_KEY'],
		authDomain: process.env['AUTH_DOMAIN'],
		messagingSenderId: process.env['MESSAGING_SENDER_ID'],
	},
};
