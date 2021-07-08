import React from "react"
import {useTranslation} from "react-i18next"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect} from "react-redux"
import { Carousel } from "react-responsive-carousel"

import "./BookPreviewModal.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import closeIcon from "../../../img/close.png"
import sliderTest from "../../../img/sliderTest.png"

interface CustomProps {
	closeModal: () => void,
	avatars?: any,
	serverBook?: any
}

function BookPreviewModal({closeModal, avatars, serverBook}:CustomProps) {
	const { t } = useTranslation()

	const imagesArray:any = Object.values(serverBook.pages)

	return(
		<div className="modal_container_big">
			<div className="modal_bg">
				<img
					onClick={closeModal}
					src={closeIcon}
					className="close_btn"
					alt="closeButton"
				/>
				<h2>
					{t("checkout.book_modal.title",
						{
							personOne: avatars[0].avatarName,
							personTwo: avatars[0].avatarName
						})
					}
				</h2>
				<div className="carousel_container">
					<Carousel
						autoPlay={false}
						infiniteLoop={false}
						showStatus={false}
						showIndicators={false}
					>
						{imagesArray.map((item:any) => (
							<div className="carousel_image_container" key={item}>
								<img src={`http://localhost:5000/${item}`} className="carousel_image" alt="pageOne"/>
							</div>
						))}
					</Carousel>
				</div>

			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		avatars: state.avatars.avatars,
		serverBook: state.serverBook.serverBook
	}
}

export default connect(mapStateToProps, null)(BookPreviewModal)
