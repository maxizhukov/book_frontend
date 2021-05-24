import React from "react"
import "./PagesEditorToolbar.css"
import {isMobile} from "react-device-detect"
import {useTranslation} from "react-i18next"
import {connect, useDispatch} from "react-redux"
import {handlePagesMenu} from "../../../redux/actions/editorMenuActions"
import {RootState} from "../../../redux/reducers/rootReducer"

interface CustomProps {
	menuState?: any
}

function PagesEditorToolbar({menuState}:CustomProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()

	const handleItemClick = (category:string) => {
		let subCategories:any = []
		let chosenSubCategory = ""
		switch (category) {
		case "background":
			subCategories = ["indoor", "outdoor"]
			chosenSubCategory = "indoor"
			break
		default: 
			subCategories = []
			chosenSubCategory = ""
		}
		dispatch(handlePagesMenu(category, subCategories, chosenSubCategory))
	}

	return(
		<div className={isMobile ? "toolbar_scroll_mobile" : "toolbar_scroll"}>
			<div className="toolbar_container" style={{minWidth: "400px"}}>
				<p
					onClick={() => handleItemClick("background")}
					className={menuState.chosenCategory === "background"
						? "sub_menu_item selected"
						: "sub_menu_item"}>
					{t("editor.pages.menu.background")}
				</p>
				<p
					onClick={() => handleItemClick("actions")}
					className={menuState.chosenCategory === "actions"
						? "sub_menu_item selected"
						: "sub_menu_item"}>
					{t("editor.pages.menu.actions")}
				</p>
				<p
					onClick={() => handleItemClick("text")}
					className={menuState.chosenCategory === "text"
						? "sub_menu_item selected"
						: "sub_menu_item"}>
					{t("editor.pages.menu.text")}
				</p>
				<p
					onClick={() => handleItemClick("elements")}
					className={menuState.chosenCategory === "elements"
						? "sub_menu_item selected"
						: "sub_menu_item"}>
					{t("editor.pages.menu.elements")}
				</p>
			</div>
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		menuState: state.editorMenu.pagesMenu
	}
}

export default connect(mapStateToProps, null)(PagesEditorToolbar)

