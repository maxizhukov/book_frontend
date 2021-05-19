import React, {useState} from "react"
import CreateMainView from "../components/views/CreateMainView"
import CreateInfoView from "../components/views/CreateInfoView"
import CreateEditorView from "../components/views/CreateEditorView"

export default function CreatePage() {
	
	const [renderPageState, setRenderPageState] = useState("editor")

	console.log(renderPageState)

	const renderPage = () => {
		switch (renderPageState) {
		case "main":
			return <CreateMainView setRenderPageState={() => setRenderPageState("info")} />
		case "info":
			return <CreateInfoView setRenderPageState={() => setRenderPageState("editor")} />
		case "editor":
			return <CreateEditorView />
		default: 
			return <h1>HEY Max</h1>
		}
	}

	return(
		<div>
			{renderPage()}
		</div>
	)
}
