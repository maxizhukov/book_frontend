import {
	CATEGORIES_ERROR,
	categoriesTypes,
	GET_FACES_OVAL
} from "../types/categoriesTypes"

const initialState = {
	loading: true,
	error: "",
	facesOval: []
}

export const categoriesReducer = (
	state = initialState,
	action:categoriesTypes) => {
	switch (action.type) {
	case GET_FACES_OVAL:
		return{
			...state,
			facesOval: action.payload,
			loading: false
		}
	case CATEGORIES_ERROR:
		return{
			...state,
			loading: false,
			error: action.payload
		}
	default: return state
	}
}
