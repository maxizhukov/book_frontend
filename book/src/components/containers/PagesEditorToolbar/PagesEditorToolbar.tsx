import React, {useEffect, useState} from "react"
import "./PagesEditorToolbar.css"
import {isMobile} from "react-device-detect"
import {useTranslation} from "react-i18next"
import {connect, useDispatch} from "react-redux"
import {handlePagesMenu} from "../../../redux/actions/editorMenuActions"
import {RootState} from "../../../redux/reducers/rootReducer"
import {useLocation} from "react-router"

interface CustomProps {
	menuState?: any
}

function PagesEditorToolbar({menuState}:CustomProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const location = useLocation()

	const [currentPage, setCurrentPage] = useState<string | undefined>(undefined)

	useEffect(() => {
		setCurrentPage(location.pathname.slice(14, window.location.pathname.length))
	}, [location])

	useEffect(() => {
		handleItemClick("background")
	}, [currentPage])

	const handleItemClick = (category:string) => {
		let subCategories:any = []
		let chosenSubCategory = ""
		switch (category) {
		case "background":
			if (currentPage === "0") {
				subCategories = ["cover"]
				chosenSubCategory = "cover"
			} else {
				/*console.log(menuState.chosenSubCategory)*/
				subCategories = ["image", "text"]
				chosenSubCategory = menuState.chosenSubCategory
			}
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

