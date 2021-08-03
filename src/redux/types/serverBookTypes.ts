export const CREATE_NEW_BOOK = "CREATE_NEW_BOOK"
export const UPDATE_BOOK_SUCCESS = "UPDATE_BOOK_SUCCESS"
export const GET_BOOK = "GET_BOOK"
export const BOOK_MESSAGES = "BOOK_MESSAGES"
export const CLEAR_BOOK_MESSAGES = "CLEAR_BOOK_MESSAGES"
export const SHOW_BOOKS_LOADING = "SHOW_BOOKS_LOADING"

interface createNewBookType {
	type: typeof CREATE_NEW_BOOK
	payload: any
}

interface updateBookSuccessType {
	type: typeof UPDATE_BOOK_SUCCESS
}

interface getBookType {
	type: typeof GET_BOOK
	payload: any
}


interface booksMessagesType {
	type: typeof BOOK_MESSAGES
	payload: string
}

interface clearBooksMessagesTypes {
	type: typeof CLEAR_BOOK_MESSAGES
}

interface showBooksLoadingTypes {
	type: typeof SHOW_BOOKS_LOADING
}

export type serverBooksTypes =
	createNewBookType |
	updateBookSuccessType |
	getBookType |
	booksMessagesType |
	clearBooksMessagesTypes |
	showBooksLoadingTypes
