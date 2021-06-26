import React from "react"
import {useTranslation} from "react-i18next"

import "./CheckoutView.css"

import TotalComponent from "../../components/ checkout/totalComponent/TotalComponent"
import CartItem from "../../components/ checkout/cartItems/CartItems"

export default function CheckoutView() {
	const { t } = useTranslation()

	return(
		<div className="checkout_view">
			<h1>{t("checkout.title")}</h1>
			<div className="checkout_container">
				<CartItem />
				<TotalComponent />
			</div>
		</div>
	)
}
