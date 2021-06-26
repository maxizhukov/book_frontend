export const CHANGE_CART_ITEMS = "CHANGE_CART_ITEMS"

interface changeCartItemsType {
	type: typeof CHANGE_CART_ITEMS
	payload: any
}


export type cartTypes =
	changeCartItemsType
