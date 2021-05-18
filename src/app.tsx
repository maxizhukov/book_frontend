import React from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import CreatePage from "./pages/CreatePage"


const App = () => (
	<div>
		<Router>
			<Switch>
				<Route exact path="/">
					<h1>/</h1>
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
