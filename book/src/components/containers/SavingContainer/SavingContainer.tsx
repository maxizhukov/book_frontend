import React from "react"
import "./SavingContainer.css"
import PropagateLoader from "react-spinners/PropagateLoader"

export default function SavingContainer() {
	return(
		<div className="book_saving">
			<div className="saving_small">
				<PropagateLoader color={"#abaaaa"} />
				<p>Saving your page</p>
			</div>
		</div>
	)
}
