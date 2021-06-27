import React, {useState} from "react"
import {useTranslation} from "react-i18next"

import "./CheckoutView.css"

import TotalComponent from "../../components/ checkout/totalComponent/TotalComponent"
import CartItem from "../../components/ checkout/cartItems/CartItems"
import Modal from "react-modal"
import BookPreviewModal from "../../components/modals/BookPreviewModal/BookPreviewModal"


// Styles for modal window
const customStyles = {
	overlay: {
		backgroundColor: "rgba(55,52,52,0.7)",
		zIndex: 9999
	},
	content : {
		top                   : "50%",
		left                  : "50%",
		right                 : "auto",
		bottom                : "auto",
		marginRight           : "-50%",
		transform             : "translate(-50%, -50%)",
		padding	: "0"
	}
}
if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root")

export default function CheckoutView() {
	const { t } = useTranslation()

	// Show preview modal
	const [showModal, setShowModal] = useState(true)

	return(
		<div className="checkout_view">
			<Modal
				style={customStyles}
				isOpen={showModal}
			>
				<BookPreviewModal
					closeModal={() => setShowModal(false)}
				/>
			</Modal>
			<h1>{t("checkout.title")}</h1>
			<div className="checkout_container">
				<CartItem />
				<TotalComponent />
			</div>
		</div>
	)
}