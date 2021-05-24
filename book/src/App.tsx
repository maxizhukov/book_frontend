import React from "react"
import { useTranslation } from "react-i18next"
import "./App.css"
import {
	Router,
	Switch,
	Route
} from "react-router-dom"
import HomeView from "./views/HomeView/HomeView"
import EditorView from "./views/EditorView/EditorView"
import NotFoundPage from "./views/NotFoundView/NotFoundView"
import { createBrowserHistory } from "history"

export const customHistory = createBrowserHistory()

function App() {
	const { t } = useTranslation()
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
					<Route>
						<NotFoundPage />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
