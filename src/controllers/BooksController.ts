import { NextFunction, Request, Response } from 'express'
import { BooksRepository } from '../repositories/BooksRepositories'

class BooksController {
	private booksRepository: BooksRepository

	constructor() {
		this.booksRepository = new BooksRepository()
	}

	async store(request: Request, response: Response, next: NextFunction) {
		const { name, author, company, read, dateRead, description, rate } = request.body
		const { user_id } = request
	
		try {
			const readVerify = read ? true : false
			const dateReadVerify = dateRead ? new Date(dateRead) : null
			const findBooksByUserId = await this.booksRepository.findByUserId(user_id)

			const filterBooks = findBooksByUserId.find((filter) => {
				return (
					filter.name && StringFormatter.formatString(filter.name) === StringFormatter.formatString(name)
				)
			})
			
			if (filterBooks) {
				throw new Error('Book already exists.')
			}

			if (!readVerify && rate) {
				throw new Error('You can grade only books that have been read.')
				
			}
			console.log('🚀 ~ file: BooksController.ts:31 ~ BooksController ~ store ~ readVerify:', readVerify)

			const result = await this.booksRepository.create({ 
				name, 
				author, 
				company, 
				read: readVerify, 
				dateRead: dateReadVerify, 
				description, 
				rate, 
				user_id,
			})		

			return response.status(201).json(result)
		} catch (error) {
			next(error)
		}
	}

	async index(request: Request, response: Response, next: NextFunction) {
		const { page, size } = request.query
		const { user_id } = request

		const DEFAULT_PAGE = 1
		const DEFAULT_SIZE = 10

		try {
			const pageNumber = page ? parseInt(page as string) : DEFAULT_PAGE
			const sizeNumber = size ? parseInt(size as string) : DEFAULT_SIZE 
			const findBooksByUserId = await this.booksRepository.findPaginateByUserId({ user_id, page: pageNumber, size: sizeNumber})
			return response.json(findBooksByUserId)

		} catch (error) {
			next(error)
		}
	}

	async delete(request: Request, response: Response, next: NextFunction) {
		const { id } = request.params
		const { user_id } = request
		try {
			const findById = await this.booksRepository.findById(id, user_id)

			if(findById.length <= 0){
				throw new Error('Book not found')
			}

			const result = await this.booksRepository.delete(id)

			return response.json(result)
		} catch (error) {
			next(error)
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const { rate } = request.body
		const { id } = request.params
		const { user_id } = request
		try {
			const findById = await this.booksRepository.findById(id, user_id)

			if(findById.length <= 0){
				throw new Error('Book not found')
			}
			
			if(!rate) {
				throw new Error('Rate not found')
			}

			// nota = de 0 até 5
			if(rate <0 || rate >5) {
				throw new Error('Only rate between 0 and 5')
			}

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const result = await this.booksRepository.update({ rate, dateRead: new Date(), id, read: true})
			return response.json({message: 'Updated Successfully'})

		} catch (error) {
			next(error)
		}
	}

}

class StringFormatter {
	static formatString(str: string) {
		str = str.toLowerCase() //transformando todas strings para minusculas
		str = str.trim() //Removendo espaçoes no final da string
		str = str.normalize('NFD') //Retirando todas ascentuações

		return str
	}
}


export { BooksController }