import {combineReducers} from "redux"
import {editorMenuReducer} from "./editorMenuReducer"
import {categoriesReducer} from "./categoriesReducer"
import {avatarsReducer} from "./avatarsReducer"
import {pagesReducer} from "./pagesReducer"
import {cartReducer} from "./cartReducer"
import {serverBookReducer} from "./serverBooksReducer"

export const rootReducer = combineReducers({
	editorMenu: editorMenuReducer,
	categories: categoriesReducer,
	avatars: avatarsReducer,
	pages: pagesReducer,
	cart: cartReducer,
	serverBook: serverBookReducer
})

export type RootState = ReturnType<typeof rootReducer>
