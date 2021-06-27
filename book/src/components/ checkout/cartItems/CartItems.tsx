import React from "react"

import {RootState} from "../../../redux/reducers/rootReducer"
import {connect} from "react-redux"
import {useTranslation} from "react-i18next"
import {rewriteCurrency} from "../../../utils/rewriteCurrency"

import "./CartItems.css"

import {ICartItem} from "../../../utils/interface"
interface CustomProps {
	cartItems?: any,
	avatars?: any
}

function CartItem({cartItems, avatars}:CustomProps) {
	const { t } = useTranslation()

	return(
		<div className="checkout_left">
			{cartItems.map((item:ICartItem, i:number) => (
				<div className="cart_item" key={`${item.name}${i}`}>
					<img className="cart_item_image" src={item.previewImage} alt="cartImage"/>
					<div style={{width: "100%"}}>
						<div className="cart_item_space_between">
							<div className="cart_item_text">
								<p>
									1x
									{item.name}
								</p>
								<p>{item.description}</p>
							</div>
							<p><strong>{rewriteCurrency(item.price, "USD")}</strong></p>
						</div>
						<div className="cart_item_links_row">
							<p>{t("checkout.item.preview")}</p>
							<p>{t("checkout.item.edit")}</p>
							<p>{t("checkout.item.remove")}</p>
						</div>
					</div>

				</div>
			))}
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		cartItems: state.cart.items,
		avatars: state.avatars.avatars
	}
}

export default connect(mapStateToProps, null)(CartItem)