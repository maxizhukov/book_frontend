export const GET_FACES_OVAL = "GET_FACES_OVAL"
export const GET_HAIR = "GET_HAIR"
export const GET_EYES = "GET_EYES"
export const GET_EYEBROWS = "GET_EYEBROWS"
export const GET_LIPS = "GET_LIPS"
export const GET_NOSES = "GET_NOSES"
export const CATEGORIES_ERROR = "CATEGORIES_ERROR"

interface getFacesOvalType {
	type: typeof GET_FACES_OVAL
	payload: any
}

interface getHairType {
	type: typeof GET_HAIR
	payload: any
}

interface getEyesType {
	type: typeof GET_EYES
	payload: any
}

interface getEyebrowsType {
	type: typeof GET_EYEBROWS
	payload: any
}

interface getLipsType {
	type: typeof GET_LIPS
	payload: any
}

interface getNosesType {
	type: typeof GET_NOSES
	payload: any
}

interface categoriesErrorType {
	type: typeof CATEGORIES_ERROR
	payload: any
}

export type categoriesTypes =
	getFacesOvalType |
	categoriesErrorType |
	getHairType |
	getEyesType |
	getEyebrowsType |
	getLipsType |
	getNosesType
