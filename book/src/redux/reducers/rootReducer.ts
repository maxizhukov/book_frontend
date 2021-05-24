import {combineReducers} from "redux"
import {editorMenuReducer} from "./editorMenuReducer"
import {categoriesReducer} from "./categoriesReducer"

export const rootReducer = combineReducers({
	editorMenu: editorMenuReducer,
	categories: categoriesReducer
})

export type RootState = ReturnType<typeof rootReducer>
