import {
	HANDLE_AVATAR_MENU,
	HANDLE_PAGE,
	HANDLE_PAGES_MENU
} from "../types/editorMenuTypes"

// Handle avatar menu
export function handleAvatarMenu(
	category:string,
	subCategories:string[],
	chosenSubCategory: string)
{
	return {
		type: HANDLE_AVATAR_MENU,
		payload: {
			category: category,
			subCategories: subCategories,
			chosenSubCategory: chosenSubCategory
		}
	}
}

// Handle pages menu
export function handlePagesMenu(
	chosenCategory:string,
	subCategories:string[],
	chosenSubCategory: string)
{
	return {
		type: HANDLE_PAGES_MENU,
		payload: {
			chosenCategory,
			subCategories,
			chosenSubCategory
		}
	}
}

// Handle page
export function handlePage(pageNumber:string) {
	return {
		type: HANDLE_PAGE,
		payload: {pageNumber}
	}
}
