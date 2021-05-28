import {avatarsTypes, CHANGE_AVATAR} from "../types/avatarsTypes"

const initialState = {
	avatars: [
		{
			skinName: "",
			faceOval: "",
			faceName: "",
			hair: "",
			hairColor: "",
			eyes: "",
			eyesName: "",
			eyesColor: "",
			eyebrows: "",
			eyebrowsName: "",
			eyebrowsColor: "",
			lips: "",
			lipsName: "",
			lipsColor: ""
		},
		{
			skinName: "",
			faceOval: "",
			faceName: "",
			hair: "",
			hairColor: "",
			eyes: "",
			eyesName: "",
			eyesColor: "",
			eyebrows: "",
			eyebrowsName: "",
			eyebrowsColor: "",
			lips: "",
			lipsName: "",
			lipsColor: ""
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
