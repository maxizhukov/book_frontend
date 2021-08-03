import React, {useEffect, useState} from "react"
import {useTranslation} from "react-i18next"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect} from "react-redux"
import {rewriteCurrency} from "../../../utils/rewriteCurrency"

import "./TotalComponent.css"

import {ICartItem} from "../../../utils/interface"
interface CustomProps {
	cartItems?: any
}

function TotalComponent({cartItems}:CustomProps) {
	const { t } = useTranslation()

	// Count total price
	const [totalPrice, setTotalPrice] = useState(0)

	useEffect(() => {
		if (cartItems.length) {
			let total = 0
			cartItems.forEach((item:ICartItem) => {
				total += item.price
			})
			setTotalPrice(total)
		}
	}, [cartItems])

	return(
		<div className="checkout_right">
			<h2>{t("checkout.summary.title")}</h2>
			<div className="line" />
			{cartItems.map((item:ICartItem, i:number) => (
				<div className="space-between" key={`${item.name}${i}`}>
					<p>{item.name}</p>
					<p>{rewriteCurrency(item.price, "USD")}</p>
				</div>
			))}
			<div className="space-between">
				<p>Ust.</p>
				<p>{rewriteCurrency(0.00, "USD")}</p>
			</div>
			<div className="space-between">
				<p>Shipping</p>
				<p>{rewriteCurrency(0.00, "USD")}</p>
			</div>
			<div className="line" />
			<div className="space-between">
				<p><strong>{t("checkout.summary.total")}</strong></p>
				<p><strong>{rewriteCurrency(totalPrice, "USD")}</strong></p>
			</div>
			<button className="checkout_btn">{t("checkout.summary.checkout_btn")}</button>
		</div>
	)
}


const mapStateToProps = (state:RootState) => {
	return {
		cartItems: state.cart.items
	}
}

export default connect(mapStateToProps, null)(TotalComponent)
