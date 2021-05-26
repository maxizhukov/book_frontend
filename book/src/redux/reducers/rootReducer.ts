import {combineReducers} from "redux"
import {editorMenuReducer} from "./editorMenuReducer"
import {categoriesReducer} from "./categoriesReducer"
import {avatarsReducer} from "./avatarsReducer"

export const rootReducer = combineReducers({
	editorMenu: editorMenuReducer,
	categories: categoriesReducer,
	avatars: avatarsReducer
})

export type RootState = ReturnType<typeof rootReducer>
