import React from "react"
import { useTranslation } from "react-i18next"
import "./EditorAvatar.css"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import EditorSubMenuContainer from "../../containers/EditorSubMenuContainer/EditorSubMenuContainer"
import EditorMenuToolbar from "../../containers/EditorMenuToolbar/EditorMenuToolbar"
import {connect} from "react-redux"
import {RootState} from "../../../redux/reducers/rootReducer"
import EditorListItem from "../../containers/EditorListItem/EditorListItem"


interface CustomProps {
	menuState?: any
}

function EditorAvatar({menuState}:CustomProps) {
	const { t } = useTranslation()

	return(
		<div className="avatar_page">
			<div className="avatar_page_window">
				<div className="editor_window_btn_box">
					<RoundedButton
						customStyle="outlined"
						text={t("editor.avatar.window_back_btn")}
					/>
					<RoundedButton
						customStyle="primary"
						text={t("editor.avatar.window_save_btn")}
					/>
				</div>
			</div>
			<div className="avatar_page_menu">
				<EditorMenuToolbar />
				{menuState.subCategories.length
					? <EditorSubMenuContainer />
					: null
				}
				<div className="editor_items_list_container">
					<div className="editor_items_list">
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
						<EditorListItem />
					</div>
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
