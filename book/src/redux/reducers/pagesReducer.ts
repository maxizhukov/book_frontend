import {CHANGE_PAGES, CHANGE_PAGES_IMAGES, pagesTypes, SHOW_PAGES_IMAGES_LOADING} from "../types/pagesTypes"
import {pagesData} from "../../utils/pagesData"

const initialState = {
	pages: pagesData,
	pagesImages: {},
	pagesImagesLoading: false
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
	case CHANGE_PAGES_IMAGES:
		return{
			...state,
			pagesImages: action.payload,
			pagesImagesLoading: false
		}
	case SHOW_PAGES_IMAGES_LOADING:
		return{
			...state,
			pagesImagesLoading: true
		}
	default: return state
	}
}
