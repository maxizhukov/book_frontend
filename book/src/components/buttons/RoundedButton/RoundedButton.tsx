import React, {useEffect, useState} from "react"
import "./RoundedButton.css"

interface CustomProps {
	customStyle: string,
	text: string
}

export default function RoundedButton({customStyle, text}:CustomProps) {
	const [btnStyle, setBtnStyle] = useState("primary")
	
	useEffect(() => {
		switch (customStyle) {
		case "primary":
			setBtnStyle("primary")
			break
		case "outlined":
			setBtnStyle("outlined")
			break
		default:
			setBtnStyle("primary")
		}
	}, [customStyle])
	
	return(
		<button className={`rounded_btn ${btnStyle}`}>
			{text}
		</button>
	)
}
