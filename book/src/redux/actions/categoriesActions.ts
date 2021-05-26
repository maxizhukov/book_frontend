import {Dispatch} from "redux"
import {
	CATEGORIES_ERROR,
	categoriesTypes,
	GET_FACES_OVAL,
	GET_HAIR
} from "../types/categoriesTypes"
import {url} from "../../core/endpoints"
import axios from "axios"
import {customHistory} from "../../App"

// Get faces oval
export const getFacesOval = () =>
	async (dispatch: Dispatch<categoriesTypes>) => {
		const fullUrl = `${url}face`
		try {
			const response = await axios.get(fullUrl)
			dispatch({
				type: GET_FACES_OVAL,
				payload: response.data
			})
		} catch (e) {
			if (e.request.status === 404) {
				customHistory.push("/error")
			} else if (e.request.status === 500) {
				customHistory.push("/server-error")
			} else {
				dispatch({
					type: CATEGORIES_ERROR,
					payload: "get_faces_oval"
				})
			}
		}
	}

// Get hairs
export const getHair = () =>
	async (dispatch: Dispatch<categoriesTypes>) => {
		const fullUrl = `${url}hair`
		try {
			const response = await axios.get(fullUrl)
			dispatch({
				type: GET_HAIR,
				payload: response.data
			})
		} catch (e) {
			if (e.request.status === 404) {
				customHistory.push("/error")
			} else if (e.request.status === 500) {
				customHistory.push("/server-error")
			} else {
				dispatch({
					type: CATEGORIES_ERROR,
					payload: "get_hair"
				})
			}
		}
	}