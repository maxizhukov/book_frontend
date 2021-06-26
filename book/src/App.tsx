import React, {lazy} from "react"
import { ToastContainer } from "react-toastify"
import {
	Router,
	Switch,
	Route
} from "react-router-dom"
import { createBrowserHistory } from "history"

import "./App.css"
import "react-toastify/dist/ReactToastify.css"

const HomeView = lazy(() => import("./views/HomeView/HomeView"))
const EditorView = lazy(() => import("./views/EditorView/EditorView"))
const NotFoundPage = lazy(() => import("./views/NotFoundView/NotFoundView"))
const CheckoutView = lazy(() => import("./views/CheckoutView/CheckoutView"))

export const customHistory = createBrowserHistory()

function App() {
	return (
		<div>
			<Router history={customHistory}>
				<Switch>
					<Route exact path="/" >
						<HomeView />
					</Route>
					<Route path="/editor">
						<EditorView />
					</Route>
					<Route path="/checkout">
						<CheckoutView />
					</Route>
					<Route>
						<NotFoundPage />
					</Route>
				</Switch>
			</Router>
			<ToastContainer />
		</div>
	)
}

export default App
