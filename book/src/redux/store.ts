import {applyMiddleware, compose, createStore} from "redux"
import {rootReducer} from "./reducers/rootReducer"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

// Redux doesn't have any types for this extension
const composeEnhancers =
	(window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const persistConfig = {
	key: "pages",
	storage: storage,
	whitelist: ["pages", "serverBook", "cart", "avatars", "editorMenu"]
}

const pReducer = persistReducer(persistConfig, rootReducer)

const Store = createStore(pReducer, compose(
	applyMiddleware(thunk),
	composeEnhancers && composeEnhancers()
))

const persistor = persistStore(Store)

export type RootStore = ReturnType<typeof rootReducer>

export {persistor, Store}

