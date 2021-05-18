import React, {useState} from "react"
import CreateMainView from "../components/views/CreateMainView"

export default function CreatePage() {
	
	const [renderPageState, setRenderPageState] = useState("main")

	const renderPage = () => {
		switch (renderPageState) {
		case "main":
			return <CreateMainView />
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
