import {combineReducers} from "redux"
import {editorMenuReducer} from "./editorMenuReducer"
import {categoriesReducer} from "./categoriesReducer"
import {avatarsReducer} from "./avatarsReducer"
import {pagesReducer} from "./pagesReducer"

export const rootReducer = combineReducers({
	editorMenu: editorMenuReducer,
	categories: categoriesReducer,
	avatars: avatarsReducer,
	pages: pagesReducer
})

export type RootState = ReturnType<typeof rootReducer>
