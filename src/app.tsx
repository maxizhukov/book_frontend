import React from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import "./app.css"
import HomePage from "./components/views/HomePage"


const App = () => (
	<div>
		<Router>
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route exact path="/create">
					<CreatePage />
				</Route>
				<Route exact path="/preview">
					<h1>/prev</h1>
				</Route>
			</Switch>
		</Router>
	</div>
)

export default App
