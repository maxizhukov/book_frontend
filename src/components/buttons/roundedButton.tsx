import React from "react"
import "./buttonsStyles.css"

interface CustomProps {
	text: string,
	backgroundColor?: string
}

export default function RoundedButton({text, backgroundColor}:CustomProps) {
	return(
		<button style={{backgroundColor: backgroundColor}} className="rounded_button">
			{text}
		</button>
	)
}
