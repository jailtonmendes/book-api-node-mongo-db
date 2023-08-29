import express, { Application, NextFunction, Request, Response } from 'express'
import { UserRoutes } from './routes/user.routes'
import { DbConnection } from './database'
import { BooksRoutes } from './routes/books.routes'

const app: Application = express()
const userRoutes = new UserRoutes().getRoutes()
const booksRoutes = new BooksRoutes().getRoutes()
const database = new DbConnection()

app.use(express.json()) //Convertendo todas as respostas em JSON
app.use('/user', userRoutes)
app.use('/books', booksRoutes)

database.connect()
app.use(express.urlencoded({ extended: true })) //Removendo espações das urls

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if(err instanceof Error) {
		return response.status(400).json({
			message: err.message
		})
	}
	return response.status(500).json({
		
		status: 500,
		message: 'Internal server error.',
	})
}
)

app.listen(3333, ()=> console.log('server is running'))