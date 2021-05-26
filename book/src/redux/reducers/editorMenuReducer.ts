import {
	avatarMenuTypes,
	HANDLE_AVATAR_MENU,
	HANDLE_PAGES_MENU
} from "../types/editorMenuTypes"

const initialState = {
	avatarMenu: {
		category: "face_oval",
		subCategories: ["editor.menu.skins"],
		chosenSubCategory: "editor.menu.skins"
	},
	pagesMenu: {
		subCategories: [],
		chosenCategory: "",
		chosenSubCategory: ""
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
	default: return state
	}
}
