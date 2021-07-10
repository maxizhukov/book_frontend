import React, {useEffect, useState} from "react"
import "./EditorMainPage.css"
import {useHistory} from "react-router-dom"
import AvatarContainer from "../../containers/AvatarContainer/AvatarContainer"
import {connect, useDispatch} from "react-redux"
import {handleAvatarMenu} from "../../../redux/actions/editorMenuActions"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import {RootState} from "../../../redux/reducers/rootReducer"
import {toast} from "react-toastify"
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
			<h1>Main</h1>
			<div
				style={{width: "350px", backgroundColor: "wheat"}}
				onClick={() => handleAvatarClick("0")}
			>
				<AvatarContainer existingIndex={0} />
			</div>
			<div
				style={{width: "350px", backgroundColor: "wheat"}}
				onClick={() => handleAvatarClick("1")}
			>
				<AvatarContainer existingIndex={1} />
			</div>
			<div className="center">
				<div style={{position: "relative", width: "100%", maxWidth: "400px"}}>
					<RoundedButton
						handleClick={handleBookBtnClick}
						full={true}
						customStyle="outlined"
						text="BUTTON"
						disabled={disableButton}
					/>
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
