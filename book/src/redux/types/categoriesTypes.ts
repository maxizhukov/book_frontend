export const GET_FACES_OVAL = "GET_FACES_OVAL"
export const CATEGORIES_ERROR = "CATEGORIES_ERROR"

interface getFacesOvalType {
	type: typeof GET_FACES_OVAL
	payload: any
}

interface categoriesErrorType {
	type: typeof CATEGORIES_ERROR
	payload: any
}

export type categoriesTypes =
	getFacesOvalType |
	categoriesErrorType
