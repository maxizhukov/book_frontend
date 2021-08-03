import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import NotFoundPage from "../NotFoundView/NotFoundView"
import EditorMainPage from "../../components/pages/EditorMainPage/EditorMainPage"
import EditorAvatar from "../../components/pages/EditorAvatar/EditorAvatar"
import BookPages from "../../components/pages/BookPages/BookPages"
import EditorInfo from "../../components/pages/EditorInfo/EditorInfo"

export default function EditorView() {
	return(
		<>
			<Switch>
				<Route exact path="/editor">
					<EditorMainPage />
				</Route>
				<Route exact path="/editor/info">
					<EditorInfo />
				</Route>
				<Route exact path="/editor/avatar">
					<EditorAvatar />
				</Route>
				<Route exact path="/editor/pages">
					<Redirect to={"/editor/pages/0"} />
				</Route>
				<Route exact path="/editor/pages/:number">
					<BookPages />
				</Route>
				<Route>
					<NotFoundPage />
				</Route>
			</Switch>
		</>
	)
}
