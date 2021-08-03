import {
	avatarMenuTypes,
	HANDLE_AVATAR_MENU,
	HANDLE_CHOSEN_ITEM,
	HANDLE_PAGE,
	HANDLE_PAGES_MENU,
	HANDLE_CHANGE_COLOR
} from "../types/editorMenuTypes"

const initialState = {
	avatarMenu: {
		category: "face_oval",
		subCategories: ["editor.menu.faceOval"]
	},
	pagesMenu: {
		subCategories: [],
		chosenCategory: "",
		chosenSubCategory: ""
	},
	chosenColor: "",
	page: undefined,
	chosenItem: {
		name: "",
		index: undefined
	}
}

export const editorMenuReducer = (
	state = initialState,
	action:avatarMenuTypes) => {
	switch (action.type) {
	case HANDLE_AVATAR_MENU:
		return{
			...state,
			avatarMenu: action.payload
		}
	case HANDLE_PAGES_MENU:
		return{
			...state,
			pagesMenu: action.payload
		}
	case HANDLE_PAGE:
		return{
			...state,
			page: action.payload
		}
	case HANDLE_CHOSEN_ITEM:
		return{
			...state,
			chosenItem: action.payload
		}
	case HANDLE_CHANGE_COLOR:
		return{
			...state,
			chosenColor: action.payload
		}
	default: return state
	}
}
