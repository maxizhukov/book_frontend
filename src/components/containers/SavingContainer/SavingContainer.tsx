import React from "react"
import "./SavingContainer.css"
import PropagateLoader from "react-spinners/PropagateLoader"
import {useTranslation} from "react-i18next"

export default function SavingContainer() {
	const { t } = useTranslation()

	return(
		<div className="book_saving">
			<div className="saving_small">
				<PropagateLoader color={"#abaaaa"} />
				<p>{t("editor.pages.saving_text")}</p>
			</div>
		</div>
	)
}
