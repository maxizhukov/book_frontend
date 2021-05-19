import React from "react"
import RoundedButton from "../buttons/roundedButton";

export default function CreateEditorView() {
	return(
		<div className="editor_page">
			<div className="editor_window">
				<RoundedButton text="save" />
			</div>
			<div className="editor_menu">

			</div>
		</div>
	)
}
