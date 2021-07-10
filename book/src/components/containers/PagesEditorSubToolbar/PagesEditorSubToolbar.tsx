import React, {useEffect, useState} from "react"
import "./PagesEditorSubToolbar.css"
import {useTranslation} from "react-i18next"
import {connect, useDispatch} from "react-redux"
import {RootState} from "../../../redux/reducers/rootReducer"
import {handlePagesMenu} from "../../../redux/actions/editorMenuActions"
import {useLocation} from "react-router"
import {image} from "html2canvas/dist/types/css/types/image"

interface CustomProps {
	menuState?: any,
	pages?: any
}

function PagesEditorSubToolbar({menuState, pages}:CustomProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const location = useLocation()

	const handleMenuClick = (category:any) => {
		dispatch(handlePagesMenu(menuState.chosenCategory, menuState.subCategories, category))
	}

	const [page, setPage] = useState("0")

	useEffect(() => {
		setPage(location.pathname.slice(14, window.location.pathname.length))
	}, [location])

	return(
		<div className="row pages_sub_menu">
			{page === "0"
				?
				<p
					onClick={() => handleMenuClick("cover")}
					className={menuState.chosenSubCategory === "cover"
						? "pages_sub_item selected"
						: "pages_sub_item"}
				>
					{t("editor.pages.menu.cover")}
				</p>
				:
				<>
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
				</>
			}
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		menuState: state.editorMenu.pagesMenu,
		pages: state.pages.pages
	}
}

export default connect(mapStateToProps, null)(PagesEditorSubToolbar)
