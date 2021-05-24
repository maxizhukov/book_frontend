import React from "react"
import "./LoadingPage.css"
import logo from "./42028-book.gif"

export default function LoadingPage() {

	return(
		<div style={{
			width: "100vw",
			height: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		}}>
			<img src={logo} alt=""/>
		</div>
	)
}
