import {
	CATEGORIES_ERROR,
	categoriesTypes,
	GET_EYEBROWS,
	GET_EYES,
	GET_FACES_OVAL,
	GET_HAIR,
	GET_LIPS,
	GET_NOSES
} from "../types/categoriesTypes"

const initialState = {
	loading: true,
	error: "",
	facesOval: [],
	hair: [],
	eyes: [],
	eyebrows: [],
	lips: [],
	nose: []
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
	case GET_HAIR:
		return{
			...state,
			hair: action.payload,
			loading: false
		}
	case GET_EYES:
		return{
			...state,
			eyes: action.payload,
			loading: false
		}
	case GET_EYEBROWS:
		return{
			...state,
			eyebrows: action.payload,
			loading: false
		}
	case GET_LIPS:
		return{
			...state,
			lips: action.payload,
			loading: false
		}
	case GET_NOSES:
		return{
			...state,
			nose: action.payload,
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
