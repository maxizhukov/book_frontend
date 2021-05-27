import {avatarsTypes, CHANGE_AVATAR} from "../types/avatarsTypes"

const initialState = {
	avatars: [
		{
			skinName: "",
			faceOval: "",
			faceName: "",
			hair: "",
			hairColor: ""
		},
		{
			skinName: "",
			faceOval: "",
			faceName: "",
			hair: "",
			hairColor: ""
		}
	]
}

export const avatarsReducer = (
	state = initialState,
	action:avatarsTypes) => {
	switch (action.type) {
	case CHANGE_AVATAR:
		return{
			...state,
			avatars: action.payload
		}
	default: return state
	}
}
