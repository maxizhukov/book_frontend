import {avatarsTypes, CHANGE_AVATAR} from "../types/avatarsTypes"

const initialState = {
	avatars: [
		{
			faceSkin: "http://localhost:5000/uploads/myImage-1621894477914.jpeg",
			hair: ""
		},
		{
			faceSkin: "http://localhost:5000/uploads/myImage-1621894477914.jpeg",
			hair: ""
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
