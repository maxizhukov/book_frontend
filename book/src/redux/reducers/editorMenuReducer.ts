import {avatarMenuTypes, HANDLE_AVATAR_MENU} from "../types/editorMenuTypes"

const initialState = {
	avatarMenu: {
		category: "",
		subCategories: [],
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
	default: return state
	}
}
