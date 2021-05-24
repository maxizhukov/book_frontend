import React, {Suspense} from "react"
import ReactDOM from "react-dom"
import Store from "./redux/store"
import {Provider} from "react-redux"
import App from "./App"
import "./i18next"
import LoadingPage from "./views/LoadingPage/LoadingPage"

ReactDOM.render(
	<Suspense fallback={<LoadingPage />}>
		<Provider store={Store}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Provider>
	</Suspense>,
	document.getElementById("root")
)
