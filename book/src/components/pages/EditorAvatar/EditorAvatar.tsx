import React, {useEffect} from "react"
import { useTranslation } from "react-i18next"
import "./EditorAvatar.css"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import EditorSubMenuContainer from "../../containers/EditorSubMenuContainer/EditorSubMenuContainer"
import EditorMenuToolbar from "../../containers/EditorMenuToolbar/EditorMenuToolbar"
import {connect} from "react-redux"
import {RootState} from "../../../redux/reducers/rootReducer"
import EditorMenList from "../../containers/EditorMenuList/EditorMenuList"
import AvatarContainer from "../../containers/AvatarContainer/AvatarContainer"
import {Link, useHistory} from "react-router-dom"
import {createCookie, getCookie} from "../../../utils/cookie"


interface CustomProps {
	menuState?: any,
	avatars?: any
}

function EditorAvatar({menuState, avatars}:CustomProps) {
	const { t } = useTranslation()
	const history = useHistory()
	const avatarIndex = window.location.search.slice(1,2)

	const handleSaveClick = () => {
		let jsonStr = JSON.stringify(avatars)
		console.log(jsonStr)
		createCookie("mycookie", jsonStr, 100)
		history.push("/editor")
	}

	return(
		<div className="avatar_page">
			<div className="avatar_page_window">
				<div className="page_window_header">
					<Link to={`/editor/info?${avatarIndex}`}>
						<RoundedButton
							customStyle="outlined"
							text={t("editor.avatar.window_back_btn")}
						/>
					</Link>
					<RoundedButton
						handleClick={handleSaveClick}
						customStyle="primary"
						text={t("editor.avatar.window_save_btn")}
					/>
				</div>
				<div className="center" style={{width: "100%", height: "calc(100% - 50px)"}}>
					<AvatarContainer />
				</div>
			</div>
			<div className="avatar_page_menu">
				<EditorMenuToolbar />
				<EditorSubMenuContainer />
				<div className="editor_items_list_container">
					<EditorMenList />
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		menuState: state.editorMenu.avatarMenu,
		avatars: state.avatars.avatars
	}
}

export default connect(mapStateToProps, null)(EditorAvatar)
