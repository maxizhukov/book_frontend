import React from "react"
import "./PagesEditorSubToolbar.css"
import {useTranslation} from "react-i18next"
import {connect, useDispatch} from "react-redux"
import {RootState} from "../../../redux/reducers/rootReducer"
import {handlePagesMenu} from "../../../redux/actions/editorMenuActions"

interface CustomProps {
	menuState?: any
}

function PagesEditorSubToolbar({menuState}:CustomProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()

	const handleMenuClick = (category:any) => {
		dispatch(handlePagesMenu(menuState.chosenCategory, menuState.subCategories, category))
	}

	return(
		<div className="row pages_sub_menu">
			{menuState.subCategories.map((item:string) => (
				<p
					onClick={() => handleMenuClick(item)}
					className={menuState.chosenSubCategory === item
						? "pages_sub_item selected"
						: "pages_sub_item"}
					key={item}
				>
					{t(`editor.pages.menu.${item}`)}
				</p>
			))}

		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		menuState: state.editorMenu.pagesMenu
	}
}

export default connect(mapStateToProps, null)(PagesEditorSubToolbar)
