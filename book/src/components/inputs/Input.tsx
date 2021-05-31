import React from "react"
import "./Input.css"

interface CustomProps {
	id: string,
	label: string,
	labelHtml: string,
	placeholder: string,
	value: string,
	autoFocus?: boolean,
	name: string,
	handleChange: any,
	type: string,
	onBlur?: any
}

export default function Input(
	{id, label, labelHtml, placeholder, value, autoFocus, name,
		handleChange, type, onBlur}:CustomProps) {

	return(
		<div className="input_container">
			<label className="label" htmlFor={labelHtml}>
				{label}
			</label>
			<input
				id={id}
				autoFocus={autoFocus}
				name={name}
				type={type}
				className="input"
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				onBlur={onBlur}
			/>
		</div>
	)
}
