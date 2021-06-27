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
	avatars?: any
}

function BookPreviewModal({closeModal, avatars}:CustomProps) {
	const { t } = useTranslation()

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
						<div className="carousel_image_container">
							<img src={sliderTest} className="carousel_image" alt="pageOne"/>
						</div>
						<div className="carousel_image_container">
							<img src={sliderTest} className="carousel_image" alt="pageOne"/>
						</div>
						<div className="carousel_image_container">
							<img src={sliderTest} className="carousel_image" alt="pageOne"/>
						</div>
					</Carousel>
				</div>

			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		avatars: state.avatars.avatars
	}
}

export default connect(mapStateToProps, null)(BookPreviewModal)
