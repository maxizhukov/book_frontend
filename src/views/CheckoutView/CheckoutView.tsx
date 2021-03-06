import React, {useEffect, useState} from "react"
import {useTranslation} from "react-i18next"

import "./CheckoutView.css"

import TotalComponent from "../../components/ checkout/totalComponent/TotalComponent"
import CartItem from "../../components/ checkout/cartItems/CartItems"
import Modal from "react-modal"
import BookPreviewModal from "../../components/modals/BookPreviewModal/BookPreviewModal"
import {connect, useDispatch} from "react-redux"
import {getBook} from "../../redux/actions/serverBooksActions"
import {getBookLocalId} from "../../utils/localId"
import {RootState} from "../../redux/reducers/rootReducer"


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

interface CustomProps {
	serverBook?: any
}

function CheckoutView({serverBook}:CustomProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()

	useEffect(() => {
		const id = getBookLocalId()
		if (id) {
			dispatch(getBook(id))
		}
	// eslint-disable-next-line
	}, [])

	// Show preview modal
	const [showModal, setShowModal] = useState(false)

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
				{serverBook.pages
					? <CartItem openPreviewModal={() => setShowModal(true)} />
					: <p>Loading</p>
				}
				<TotalComponent />
			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		serverBook: state.serverBook.serverBook
	}
}

export default connect(mapStateToProps, null)(CheckoutView)
