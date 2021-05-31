export const HANDLE_AVATAR_MENU = "HANDLE_AVATAR_MENU"
export const HANDLE_PAGES_MENU = "HANDLE_PAGES_MENU"
export const HANDLE_PAGE = "HANDLE_PAGE"

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

export type avatarMenuTypes =
	HandleAvatarMenu |
	HandlePagesMenu |
	HandlePage
