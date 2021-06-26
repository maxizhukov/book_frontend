import {CHANGE_CART_ITEMS} from "../types/cartTypes"

export function changeCartItems(items:any) {
	return {
		type: CHANGE_CART_ITEMS,
		payload: items
	}
}

