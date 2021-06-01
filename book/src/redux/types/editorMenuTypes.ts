export const HANDLE_AVATAR_MENU = "HANDLE_AVATAR_MENU"
export const HANDLE_PAGES_MENU = "HANDLE_PAGES_MENU"
export const HANDLE_PAGE = "HANDLE_PAGE"
export const HANDLE_CHOSEN_ITEM = "HANDLE_CHOSEN_ITEM"

interface HandleAvatarMenu {
	type: typeof HANDLE_AVATAR_MENU
	payload: any
}

interface HandlePagesMenu {
	type: typeof HANDLE_PAGES_MENU
	payload: any
}

interface HandlePage {
	type: typeof HANDLE_PAGE
	payload: any
}

interface HandleChosenItem {
	type: typeof HANDLE_CHOSEN_ITEM
	payload: any
}


export type avatarMenuTypes =
	HandleAvatarMenu |
	HandlePagesMenu |
	HandlePage |
	HandleChosenItem
