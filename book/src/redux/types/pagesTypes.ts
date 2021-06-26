export const CHANGE_PAGES = "CHANGE_PAGES"
export const CHANGE_PAGES_IMAGES = "CHANGE_PAGES_IMAGES"
export const SHOW_PAGES_IMAGES_LOADING = "SHOW_PAGES_IMAGES_LOADING"

interface changePagesType {
	type: typeof CHANGE_PAGES
	payload: any
}

interface changePagesImagesType {
	type: typeof CHANGE_PAGES_IMAGES
	payload: any
}

interface showPagesImagesLoadingType {
	type: typeof SHOW_PAGES_IMAGES_LOADING
}

export type pagesTypes =
	changePagesType |
	changePagesImagesType |
	showPagesImagesLoadingType
