import {
	HANDLE_AVATAR_MENU, HANDLE_CHANGE_COLOR, HANDLE_CHOSEN_ITEM,
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

// Trigger change color for update loading state for images
export function changeColor(color:string) {
	return {
		type: HANDLE_CHANGE_COLOR,
		payload: color
	}
}


// Handle page
export function handlePage(pageNumber:string) {
	return {
		type: HANDLE_PAGE,
		payload: {pageNumber}
	}
}

// Handle chosen item
export function handleChosenItem(item:any) {
	return {
		type: HANDLE_CHOSEN_ITEM,
		payload: item
	}
}

