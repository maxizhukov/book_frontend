import {avatarsTypes, CHANGE_AVATAR} from "../types/avatarsTypes"

const initialState = {
	avatars: [
		{
			avatarName: "",
			avatarGender: "",
			skinName: "4",
			faceOval: "http://localhost:5000/uploads/myImage-1622149538423.png",
			faceName: "1",
			hair: "http://localhost:5000/uploads/myImage-1622243910513.png",
			hairName: "1",
			hairColor: "7",
			eyes: "http://localhost:5000/uploads/myImage-1622154980573.png",
			eyesName: "1",
			eyesColor: "10",
			eyebrows: "http://localhost:5000/uploads/myImage-1622228784865.png",
			eyebrowsName: "1",
			eyebrowsColor: "7",
			lips: "http://localhost:5000/uploads/myImage-1622236262720.png",
			lipsName: "1",
			lipsColor: "4",
			nose: "http://localhost:5000/uploads/myImage-1622243438895.png",
			noseName: "1"
		},
		{
			avatarName: "",
			avatarGender: "",
			skinName: "4",
			faceOval: "http://localhost:5000/uploads/myImage-1622149538423.png",
			faceName: "1",
			hair: "http://localhost:5000/uploads/myImage-1622243910513.png",
			hairName: "1",
			hairColor: "7",
			eyes: "http://localhost:5000/uploads/myImage-1622154980573.png",
			eyesName: "1",
			eyesColor: "10",
			eyebrows: "http://localhost:5000/uploads/myImage-1622228784865.png",
			eyebrowsName: "1",
			eyebrowsColor: "7",
			lips: "http://localhost:5000/uploads/myImage-1622236262720.png",
			lipsName: "1",
			lipsColor: "4",
			nose: "http://localhost:5000/uploads/myImage-1622243438895.png",
			noseName: "1"
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
