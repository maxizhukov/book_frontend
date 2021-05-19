import React from "react"

interface CustomProps {
	setRenderPageState: () => void
}

export default function CreateMainView({setRenderPageState}:CustomProps) {

	return (
		<div>
			<button onClick={() => setRenderPageState()}>
				Next
			</button>
		</div>
	)
}
