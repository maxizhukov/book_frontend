import React, {useEffect} from "react"
import { useTranslation } from "react-i18next"
import "./EditorAvatar.css"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import EditorSubMenuContainer from "../../containers/EditorSubMenuContainer/EditorSubMenuContainer"
import EditorMenuToolbar from "../../containers/EditorMenuToolbar/EditorMenuToolbar"
import {connect, useDispatch} from "react-redux"
import {RootState} from "../../../redux/reducers/rootReducer"
import EditorMenList from "../../containers/EditorMenuList/EditorMenuList"
import AvatarContainer from "../../containers/AvatarContainer/AvatarContainer"


interface CustomProps {
	menuState?: any
}

function EditorAvatar({menuState}:CustomProps) {
	const { t } = useTranslation()

	/*editor_window_btn_box*/

	return(
		<div className="avatar_page">
			<div className="avatar_page_window">
				<div className="page_window_header">
					<RoundedButton
						customStyle="outlined"
						text={t("editor.avatar.window_back_btn")}
					/>
					<RoundedButton
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
				{menuState.subCategories.length
					? <EditorSubMenuContainer />
					: null
				}
				<div className="editor_items_list_container">
					<EditorMenList />
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		menuState: state.editorMenu.avatarMenu
	}
}

export default connect(mapStateToProps, null)(EditorAvatar)
