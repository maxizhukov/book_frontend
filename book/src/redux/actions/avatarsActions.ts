import {CHANGE_AVATAR} from "../types/avatarsTypes"

// Handle change avatar object
export function changeAvatar(avatars:any) {
	return {
		type: CHANGE_AVATAR,
		payload: avatars
	}
}

