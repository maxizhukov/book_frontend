import {HANDLE_AVATAR_MENU} from "../types/editorMenuTypes"

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
