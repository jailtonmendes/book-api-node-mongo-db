import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
	definition: {
		info: {
			title: 'Hello World',
			version: '1.0.0',
			contact: {
				name: 'Jailton Mendes',
			}
		},
	},
	apis: [ '**/*.ts'],
}

export const SwaggerSpec = swaggerJsdoc(options)
