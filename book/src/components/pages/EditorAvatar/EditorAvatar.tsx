import React, {useEffect} from "react"
import { useTranslation } from "react-i18next"
import "./EditorAvatar.css"
import RoundedButton from "../../buttons/RoundedButton/RoundedButton"
import EditorSubMenuContainer from "../../containers/EditorSubMenuContainer/EditorSubMenuContainer"
import EditorMenuToolbar from "../../containers/EditorMenuToolbar/EditorMenuToolbar"
import {connect, useDispatch} from "react-redux"
import {RootState} from "../../../redux/reducers/rootReducer"
import EditorListItem from "../../containers/EditorListItem/EditorListItem"
import {getFacesOval} from "../../../redux/actions/categoriesActions"


interface CustomProps {
	menuState?: any,
	categories?: any
}

function EditorAvatar({menuState, categories}:CustomProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getFacesOval())
	}, [])

	console.log(categories.facesOval)

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
						{categories.loading
							? <p>Loading</p>
							: categories.facesOval.faces.map((item:any) => (
								<p>OK</p>
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		menuState: state.editorMenu.avatarMenu,
		categories: state.categories
	}
}

export default connect(mapStateToProps, null)(EditorAvatar)
