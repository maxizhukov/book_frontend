import React, {useEffect, useState} from "react"

import "./EditorMainPage.css"
import bodyImgOne from "../../../img/Editor/body_1.png"
import bodyImgTwo from "../../../img/Editor/body_2.png"
import bodyImgThree from "../../../img/Editor/body_3.png"
import bodyImgFour from "../../../img/Editor/body_4.png"

import {useHistory} from "react-router-dom"
import AvatarContainer from "../../containers/AvatarContainer/AvatarContainer"
import {connect, useDispatch} from "react-redux"
import {handleAvatarMenu} from "../../../redux/actions/editorMenuActions"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import {RootState} from "../../../redux/reducers/rootReducer"
import {useTranslation} from "react-i18next"

interface CustomProps {
	avatars?: any
}

function EditorMainPage({avatars}:CustomProps) {
	const dispatch = useDispatch()
	const history = useHistory()
	const { t } = useTranslation()

	const handleAvatarClick = (avatar:string) => {
		history.push(`/editor/info?${avatar}`)
	}

	// Clear menu state
	useEffect(() => {
		dispatch(handleAvatarMenu(
			"face_oval",
			["editor.menu.faceOval"],
			"editor.menu.faceOval"))
		// eslint-disable-next-line
	}, [])

	const handleBookBtnClick = () => {
		let requiredFields = 0
		avatars.forEach((avatar:any) => {
			if (avatar.avatarName.trim().length) {
				requiredFields += 1
			}
			if (avatar.avatarGender.trim().length) {
				requiredFields += 1
			}
		})
		if (requiredFields === 4) {
			history.push("/editor/pages")
		} else {
			history.push("/editor/pages")
			/*toast(t("warnings.not_all_character_finished"))*/
		}
	}

	// Disable continue button
	const [disableButton, setDisableButton] = useState(true)

	useEffect(() => {
		let requiredItem = 0
		avatars.forEach((avatar:any) => {
			if (avatar.avatarName.trim().length) {
				requiredItem += 1
				if (avatar.avatarGender.trim().length) {
					requiredItem += 1
				}
 			}
			if (requiredItem === 4) {
				setDisableButton(false)
			}
		})
	}, [avatars])

	return(
		<>
			<div className="editor_main_header">
				<h2>Logo</h2>
				<RoundedButton
					handleClick={handleBookBtnClick}
					full={true}
					customStyle="outlined"
					text={t("editor.main.header.btn")}
					disabled={disableButton}
					styles={{maxWidth: "150px"}}
				/>
			</div>
			<div className="center">
				<h2>{t("editor.main.content.title")}</h2>
			</div>
			<div className="main_page_avatars_container">
				<img
					className="main_page_avatars_body first"
					src={bodyImgOne} alt="body"
					onClick={() => handleAvatarClick("0")}
				/>
				<img
					className="main_page_avatars_body second"
					src={bodyImgTwo} alt="body"
					onClick={() => handleAvatarClick("1")}
				/>
				<div
					style={{
						position: "absolute",
						zIndex: 10,
						width: "26%",
						left: "22%",
						top: "9%"
					}}
					onClick={() => handleAvatarClick("0")}
				>
					<AvatarContainer existingIndex={0} />
				</div>
				<div
					style={{
						position: "absolute",
						zIndex: 10,
						width: "26%",
						left: "52%",
						top: "9%"
					}}
					onClick={() => handleAvatarClick("1")}
				>
					<AvatarContainer existingIndex={1} />
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		avatars: state.avatars.avatars
	}
}

export default connect(mapStateToProps, null)(EditorMainPage)
