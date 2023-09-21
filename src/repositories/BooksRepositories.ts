import { Books } from '../models'

interface ICreateBook {
	name: string 
	author: string 
	company: string 
	read: boolean 
	dateRead: Date | null
	description: string 
	rate: number
	user_id: string
}

interface IBookPaginate {
	user_id: string
	page: number
	size: number
}

interface IUpdate {
	rate: number
	dateRead: Date
	read: boolean
	id: string
}

class BooksRepository {

	async create({ 
		name, 
		author, 
		company, 
		user_id,
		dateRead, 
		description, 
		read, 
		rate, 
	}: ICreateBook) {
		const result = await Books.create({
			name, 
			author, 
			company, 
			user_id,
			dateRead, 
			description, 
			read, 
			rate, 
		})
		console.log('🚀 ~ file: BooksRepositories.ts:42 ~ BooksRepository ~ result:', result)
		return result
	}	
	
	async findByUserId(user_id: string) {
		const result = await Books.find({ user_id })
		return result
	}

	findPaginateByUserId({user_id, page, size}: IBookPaginate) {
		const result = Books.find({user_id})
			.skip((page-1)*size)
			.limit(size)
			.exec()
		return result
	}

	findById(id: string, user_id: string){
		return Books.find({ _id: id, user_id}).exec()
	}

	async delete(id: string){
		const result = await Books.findByIdAndRemove(id)
		return result
	}

	update({ rate, dateRead, read, id}: IUpdate) {
		return Books.findById(id).updateMany({ rate, dateRead, read }).exec()
	}

}

export {BooksRepository}