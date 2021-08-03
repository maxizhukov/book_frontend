import {cartTypes, CHANGE_CART_ITEMS} from "../types/cartTypes"


const initialState = {
	items: []
}

export const cartReducer = (
	state = initialState,
	action:cartTypes) => {
	switch (action.type) {
	case CHANGE_CART_ITEMS:
		return{
			...state,
			items: action.payload
		}
	default: return state
	}
}
