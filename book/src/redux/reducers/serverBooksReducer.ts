import {
	BOOK_MESSAGES,
	CLEAR_BOOK_MESSAGES,
	CREATE_NEW_BOOK, GET_BOOK,
	serverBooksTypes,
	SHOW_BOOKS_LOADING,
	UPDATE_BOOK_SUCCESS
} from "../types/serverBookTypes"


const initialState = {
	serverBookId: {},
	serverBook: {},
	messages: "",
	loading: false
}

export const serverBookReducer = (
	state = initialState,
	action:serverBooksTypes) => {
	switch (action.type) {
	case CREATE_NEW_BOOK:
		return{
			...state,
			serverBookId: action.payload
		}
	case UPDATE_BOOK_SUCCESS:
		return{
			...state,
			loading: false
		}
	case GET_BOOK:
		return{
			...state,
			loading: false,
			serverBook: action.payload
		}
	case BOOK_MESSAGES:
		return{
			...state,
			messages: action.payload
		}
	case CLEAR_BOOK_MESSAGES:
		return{
			...state,
			messages: ""
		}
	case SHOW_BOOKS_LOADING:
		return{
			...state,
			loading: true
		}
	default: return state
	}
}
