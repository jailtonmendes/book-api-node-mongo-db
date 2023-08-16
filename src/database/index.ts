import mongoose from 'mongoose'

class DbConnection {
	async connect() {
		try {
			await mongoose.connect(
				'mongodb+srv://admin:Jaja24061991@cluster0.tw3gqeh.mongodb.net/bookapi'
			)
			console.log('connect to database')
		} catch (error) {
			console.log('error to connect database')
		}
	}
}

export { DbConnection }
