import React from "react"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect, useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"
import "./EditorSubMenuContainer.css"
import {handleAvatarMenu} from "../../../redux/actions/editorMenuActions"

interface CustomProps {
	menuState?: any
}

function EditorSubMenuContainer({menuState}:CustomProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()

	const handleItemClick = (category:string) => {
		dispatch(handleAvatarMenu(menuState.category, menuState.subCategories, category))
	}

	return(
		<div className="editor_sub_menu_container">
			{menuState.subCategories.map((category:string) => (
				<p
					onClick={() => handleItemClick(category)}
					className={menuState.chosenSubCategory === category
						? "sub_menu_item selected"
						: "sub_menu_item"}
					key={category}>
					{t(`${category}`)}
				</p>
			))}
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		menuState: state.editorMenu.avatarMenu
	}
}

export default connect(mapStateToProps, null)(EditorSubMenuContainer)
