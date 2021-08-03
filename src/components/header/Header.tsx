import React from "react"
import "./Header.css"
import Logo from "../../img/Landing/logo.png"
import RoundedButton from "../buttons/RoundedButton/RoundedButton"
import {useHistory} from "react-router-dom"

export default function Header() {
	const history = useHistory()

	return(
		<header>
			<img src={Logo} alt="logo"/>
			<div className="row">
				<div className="row links_row">
					<a className="header_link" href="#!">Pricing</a>
					<a className="header_link" href="#!">About</a>
					<a className="header_link" href="#!">Contact</a>
				</div>
				<RoundedButton
					customStyle="outlined"
					text="Get started"
					handleClick={() => history.push("/editor")}
				/>
			</div>
		</header>
	)
}
