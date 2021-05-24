import {combineReducers} from "redux"
import {editorMenuReducer} from "./editorMenuReducer"

export const rootReducer = combineReducers({
	editorMenu: editorMenuReducer
})

export type RootState = ReturnType<typeof rootReducer>
