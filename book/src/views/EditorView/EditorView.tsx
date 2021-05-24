import React from "react"
import {Route, Switch} from "react-router-dom"
import NotFoundPage from "../NotFoundView/NotFoundView"
import EditorMainPage from "../../components/pages/EditorMainPage/EditorMainPage"
import EditorAvatar from "../../components/pages/EditorAvatar/EditorAvatar"
import CoverCreator from "../../components/pages/CoverCreator/CoverCreator"
import BookPages from "../../components/pages/BookPages/BookPages"

export default function EditorView() {
	return(
		<>
			<Switch>
				<Route exact path="/editor">
					<EditorMainPage />
				</Route>
				<Route exact path="/editor/avatar">
					<EditorAvatar />
				</Route>
				<Route exact path="/editor/cover">
					<CoverCreator />
				</Route>
				<Route exact path="/editor/pages">
					<BookPages />
				</Route>
				<Route>
					<NotFoundPage />
				</Route>
			</Switch>
		</>
	)
}
