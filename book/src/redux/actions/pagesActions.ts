import {CHANGE_PAGES} from "../types/pagesTypes"

export function changePages(pages:any) {
	return {
		type: CHANGE_PAGES,
		payload: pages
	}
}

