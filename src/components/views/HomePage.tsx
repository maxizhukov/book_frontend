import React from "react"
import { useTranslation } from "react-i18next"


export default function HomePage() {
	const { t, i18n } = useTranslation()
	return(
		<h1>
			{t("test")}
		</h1>
	)
}
