import React from "react"
import "../SavingContainer/SavingContainer.css"
import HashLoader from "react-spinners/HashLoader"
import {useTranslation} from "react-i18next"

export default function LoadingBookPage() {
	const { t } = useTranslation()

	return(
		<div className="book_saving">
			<div className="saving_small">
				<HashLoader color={"#30A6D9"} />
			</div>
		</div>
	)
}
