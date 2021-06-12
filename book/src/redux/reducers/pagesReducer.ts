import {CHANGE_PAGES, pagesTypes} from "../types/pagesTypes"

const initialState = {
	pages: [
		{
			backgroundName: "1",
			background: "http://localhost:5000/uploads/myImage-1623508388362.jpeg"
		}
	]
}

export const pagesReducer = (
	state = initialState,
	action:pagesTypes) => {
	switch (action.type) {
	case CHANGE_PAGES:
		return{
			...state,
			pages: action.payload
		}
	default: return state
	}
}
