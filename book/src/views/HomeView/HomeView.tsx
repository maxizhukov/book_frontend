import React from "react"
import { Link } from "react-router-dom"

export default function HomeView() {
	return(
		<>
			<h1>HOME</h1>
			<Link to="/editor"> Create Book </Link>
		</>
	)
}
