import React, {useEffect, useState} from "react"
import "./RoundedButton.css"

interface CustomProps {
	customStyle: string,
	text: string,
	handleClick?: any,
	full?: boolean,
	styles?: any,
	disabled?: boolean
}

export default function RoundedButton(
	{customStyle, text, handleClick, full, styles, disabled}:CustomProps) {
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

	const style = `${full && "full"} ${btnStyle}`
	
	return(
		<button
			disabled={disabled}
			style={styles}
			onClick={handleClick}
			className={`rounded_btn ${style}`}
		>
			{text}
		</button>
	)
}
