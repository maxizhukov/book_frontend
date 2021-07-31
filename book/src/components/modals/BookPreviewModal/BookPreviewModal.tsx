import React, {useState} from "react"
import {useTranslation} from "react-i18next"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect} from "react-redux"

import "./BookPreviewModal.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import closeIcon from "../../../img/close.png"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import {useHistory} from "react-router-dom"

interface CustomProps {
	closeModal: () => void,
	avatars?: any,
	serverBook?: any
}

function BookPreviewModal({closeModal, avatars, serverBook}:CustomProps) {
	const { t } = useTranslation()
	const history = useHistory()

	const imagesArray:any = Object.values(serverBook.pages)

	const [previewImage, setPreviewImage] = useState("")

	return(
		<div className="modal_container_big">
			<div className="modal_bg">

				{previewImage
					?
					<div className="check_preview_image_box">
						<div className="space-between" style={{marginBottom: "40px"}}>
							<RoundedButton
								customStyle="outlined"
								text={t("checkout.book_modal.btn.close")}
								handleClick={() => setPreviewImage("")}
							/>
							<RoundedButton
								customStyle="outlined"
								text={t("checkout.book_modal.btn.edit")}
							/>
						</div>
						<div className="center">
							<img
								className="check_page_preview"
								src={`http://localhost:5000/${previewImage}`}
								alt={previewImage}
							/>
						</div>
					</div>
					:
					<>
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

						<div className="preview_container">
							{imagesArray.map((item:any, index:number) => (
								<div className="check_preview_image_box" key={item}>
									<img
										src={`http://localhost:5000/${item}`}
										className="check_preview_image"
										alt={item}
									/>
									<div className="check_preview_image_buttons_box">
										<button
											onClick={() => setPreviewImage(item)}
											className="check_preview_button"
										>
											{t("checkout.book_modal.btn.preview")}
										</button>
										<button className="check_preview_button">
											{t("checkout.book_modal.btn.edit")}

										</button>
									</div>
								</div>
							))}
						</div>
					</>
				}
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
