import {Dispatch} from "redux"
import {url} from "../../core/endpoints"
import axios from "axios"
import {customHistory} from "../../App"
import {
	BOOK_MESSAGES,
	GET_BOOK,
	serverBooksTypes,
	SHOW_BOOKS_LOADING,
	UPDATE_BOOK_SUCCESS
} from "../types/serverBookTypes"
import {getBookLocalId, setBookLocalId} from "../../utils/localId"

function DataURIToBlob(dataURI: string) {
	const splitDataURI = dataURI.split(",")
	const byteString = splitDataURI[0].indexOf("base64") >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
	const mimeString = splitDataURI[0].split(":")[1].split(";")[0]

	const ia = new Uint8Array(byteString.length)
	for (let i = 0; i < byteString.length; i++)
		ia[i] = byteString.charCodeAt(i)

	return new Blob([ia], { type: mimeString })
}

// Post new book
export const postNewBook = (id: string, pages: any) =>
	async (dispatch: Dispatch<serverBooksTypes>) => {
		const fullUrl = `${url}books`
		const body = {
			id,
			pages
		}
		try {
			const response = await axios.post(fullUrl, body)
			setBookLocalId(response.data.id)
		} catch (e) {
			if (e.request.status === 404) {
				customHistory.push("/error")
			} else if (e.request.status === 500) {
				customHistory.push("/server-error")
			} else {
				dispatch({
					type: BOOK_MESSAGES,
					payload: "post_error"
				})
			}
		}
	}

// Update book
export const updateBook = (page: string, image: any) =>
	async (dispatch: Dispatch<serverBooksTypes>) => {
		const file = DataURIToBlob(image)
		const formData = new FormData()
		formData.append("myImage", file, "image.png")
		formData.append("page", page)
		const id = getBookLocalId()
		const options = {headers: { "Content-Type": "multipart/form-data" }}
		const fullUrl = `${url}books/${id}`
		try {
			const response = await axios.put(fullUrl, formData, options)
			if (response) {
				dispatch({
					type: UPDATE_BOOK_SUCCESS
				})
			}
		} catch (e) {
			if (e.request.status === 404) {
				customHistory.push("/error")
			} else if (e.request.status === 500) {
				customHistory.push("/server-error")
			} else {
				console.log(e)
			}
		}
	}

// Get book
export const getBook = (id: string) =>
	async (dispatch: Dispatch<serverBooksTypes>) => {
		const fullUrl = `${url}books/${id}`
		try {
			const response = await axios.get(fullUrl)
			if (response) {
				dispatch({
					type: GET_BOOK,
					payload: response.data
				})
			}
		} catch (e) {
			if (e.request.status === 404) {
				customHistory.push("/error")
			} else if (e.request.status === 500) {
				customHistory.push("/server-error")
			} else {
				console.log(e)
			}
		}
	}
	
export const showBooksPagesLoading = () => {
	return {
		type: SHOW_BOOKS_LOADING
	}
}
