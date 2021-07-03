import {CHANGE_PAGES, CHANGE_PAGES_IMAGES, SHOW_PAGES_IMAGES_LOADING} from "../types/pagesTypes"
import {createCookie, getCookie} from "../../utils/cookie"

export function changePages(pages:any) {
	return {
		type: CHANGE_PAGES,
		payload: pages
	}
}

export function changePagesImages(pages:any) {
	const pagesCopy = {...pages}
	let jsonStr = JSON.stringify(pagesCopy)
	createCookie("pages", jsonStr, 100)
	return {
		type: CHANGE_PAGES_IMAGES,
		payload: pages
	}
}

export function showPagesImagesLoading() {
	return {
		type: SHOW_PAGES_IMAGES_LOADING
	}
}

