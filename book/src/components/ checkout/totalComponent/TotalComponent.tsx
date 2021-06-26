import React from "react"
import {useTranslation} from "react-i18next"

import "./TotalComponent.css"

export default function TotalComponent() {
	const { t } = useTranslation()
	return(
		<div className="checkout_right">
			<h2>{t("checkout.summary.title")}</h2>
			<div className="line" />
			<div className="space-between">
				<p>1x Love Book</p>
				<p>40.00 $</p>
			</div>
			<div className="space-between">
				<p>Ust.</p>
				<p>0.00 $</p>
			</div>
			<div className="space-between">
				<p>Shipping</p>
				<p>0.00 $</p>
			</div>
			<div className="line" />
			<div className="space-between">
				<p><strong>{t("checkout.summary.total")}</strong></p>
				<p><strong>40.00 $</strong></p>
			</div>
			<button className="checkout_btn">{t("checkout.summary.checkout_btn")}</button>
		</div>
	)
}
