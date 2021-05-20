import React from "react"
import { useTranslation } from "react-i18next"

interface CustomProps {
	setRenderPageState: () => void
}

export default function CreateMainView({setRenderPageState}:CustomProps) {
	const { t } = useTranslation()

	return (
		<div>
			<button onClick={() => setRenderPageState()}>
				{t("create.main.test")}
			</button>
		</div>
	)
}
