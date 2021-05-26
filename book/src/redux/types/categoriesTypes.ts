export const GET_FACES_OVAL = "GET_FACES_OVAL"
export const GET_HAIR = "GET_HAIR"
export const CATEGORIES_ERROR = "CATEGORIES_ERROR"

interface getFacesOvalType {
	type: typeof GET_FACES_OVAL
	payload: any
}

interface getHairType {
	type: typeof GET_HAIR
	payload: any
}

interface categoriesErrorType {
	type: typeof CATEGORIES_ERROR
	payload: any
}

export type categoriesTypes =
	getFacesOvalType |
	categoriesErrorType |
	getHairType
