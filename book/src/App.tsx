import React from "react"
import { useTranslation } from "react-i18next"
import "./App.css"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom"
import HomeView from "./views/HomeView/HomeView"
import EditorView from "./views/EditorView/EditorView"
import NotFoundPage from "./views/NotFoundView/NotFoundView"

function App() {
	const { t } = useTranslation()
	return (
		<div>
			<Router>
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
