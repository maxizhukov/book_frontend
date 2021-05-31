import {
	avatarMenuTypes,
	HANDLE_AVATAR_MENU,
	HANDLE_PAGE,
	HANDLE_PAGES_MENU
} from "../types/editorMenuTypes"

const initialState = {
	avatarMenu: {
		category: "face_oval",
		subCategories: ["editor.menu.faceOval"],
		chosenSubCategory: "editor.menu.faceOval"
	},
	pagesMenu: {
		subCategories: [],
		chosenCategory: "",
		chosenSubCategory: ""
	},
	page: "0"
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
	default: return state
	}
}
