import React, {Suspense} from "react"
import ReactDOM from "react-dom"
import App from "./app"
import "./i18n"

ReactDOM.render(
	<Suspense fallback={<h1>Loading</h1>}>
		<App />
	</Suspense>, document.querySelector("#root"))
