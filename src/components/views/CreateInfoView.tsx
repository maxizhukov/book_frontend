import React from "react"

interface CustomProps {
	setRenderPageState: () => void
}

export default function CreateInfoView({setRenderPageState}:CustomProps) {
	return(
		<div>
			<button onClick={() => setRenderPageState()}>
				Next Page
			</button>
		</div>
	)
}
