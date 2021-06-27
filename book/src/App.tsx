import React, {lazy, useEffect} from "react"
import { ToastContainer } from "react-toastify"
import {
	Router,
	Switch,
	Route
} from "react-router-dom"
import { createBrowserHistory } from "history"
import axios from "axios"

import "./App.css"
import "react-toastify/dist/ReactToastify.css"

const HomeView = lazy(() => import("./views/HomeView/HomeView"))
const EditorView = lazy(() => import("./views/EditorView/EditorView"))
const NotFoundPage = lazy(() => import("./views/NotFoundView/NotFoundView"))
const CheckoutView = lazy(() => import("./views/CheckoutView/CheckoutView"))

export const customHistory = createBrowserHistory()

function App() {

	const userId = window.localStorage.getItem("userId")

	useEffect(() => {
		if (!userId) {
			const postNewUser = async () => {
				try {
					const response = await axios.post("http://localhost:5000/api/users")
					let values:string[] = []
					const data = response.data.id
					const oneDay = new Date()
					oneDay.setHours(oneDay.getHours() + 240)
					values.push(data)
					values.push(oneDay.toString())
					window.localStorage.setItem("userId", values.join(";"))
				} catch (e) {
					if (e.request.status === 404) {
						customHistory.push("/error")
					} else if (e.request.status === 500) {
						customHistory.push("/server-error")
					} else {
						console.log("Error")
					}
				}
			}
			postNewUser()
		} else if (userId) {
			let values = localStorage.getItem("userId")?.split(";")
			if (values) {
				console.log(new Date(values[1]))
				if (new Date(values[1]) < new Date()) {
					const postNewUser = async () => {
						try {
							const response = await axios.post("http://localhost:5000/api/users")
							let values:string[] = []
							const data = response.data.id
							const oneDay = new Date()
							oneDay.setHours(oneDay.getHours() + 240)
							values.push(data)
							values.push(oneDay.toString())
							window.localStorage.setItem("userId", values.join(";"))
						} catch (e) {
							if (e.request.status === 404) {
								customHistory.push("/error")
							} else if (e.request.status === 500) {
								customHistory.push("/server-error")
							} else {
								console.log("Error")
							}
						}
					}
					postNewUser()
				}
			}
		}
	}, [userId])

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
