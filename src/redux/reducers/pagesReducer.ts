import {CHANGE_PAGES, pagesTypes} from "../types/pagesTypes"
import {pagesData} from "../../utils/pagesData"

const initialState = {
	pages: pagesData
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
