import React from "react"
import "./EditorMenuToolbar.css"
import {isMobile} from "react-device-detect"
import {connect, useDispatch} from "react-redux"
import {RootState} from "../../../redux/reducers/rootReducer"
import {handleAvatarMenu} from "../../../redux/actions/editorMenuActions"

interface CustomProps {
	menuState?: any
}

function EditorMenuToolbar({menuState}:CustomProps) {
	const dispatch = useDispatch()

	// Handle click one menu item
	const handleMenuClick = (menuItem:string) => {
		let subCategories:any = []
		let defaultChooseSubCategory:string = ""
		switch (menuItem) {
		case "face_oval":
			subCategories = ["editor.menu.skins"]
			defaultChooseSubCategory = "editor.menu.skins"
			break
		case "hair":
			subCategories = [
				"editor.menu.hair_short",
				"editor.menu.hair_middle",
				"editor.menu.hair_long"
			]
			defaultChooseSubCategory = "editor.menu.hair_short"
			break
		default: subCategories = []
		}
		dispatch(handleAvatarMenu(menuItem, subCategories, defaultChooseSubCategory))
	}

	return(
		<>
			<div className={isMobile ? "toolbar_scroll_mobile" : "toolbar_scroll"}>
				<div className="toolbar_container">
					<i
						onClick={() => handleMenuClick("face_oval")}
						className=
						   {menuState.category === "face_oval"
							   ? "fas fa-eye toolbar_icon selected"
							   : "fas fa-eye toolbar_icon"
						   }>
						1
					</i>
					<i
						onClick={() => handleMenuClick("hair")}
						className=
							{menuState.category === "hair"
								? "fas fa-eye toolbar_icon selected"
								: "fas fa-eye toolbar_icon"
							}>
						1
					</i>
					<i
						onClick={() => handleMenuClick("eyes")}
						className=
							{menuState.category === "eyes"
								? "fas fa-eye toolbar_icon selected"
								: "fas fa-eye toolbar_icon"
							}>
						1
					</i>
					<i
						onClick={() => handleMenuClick("eyebrows")}
						className=
							{menuState.category === "eyebrows"
								? "fas fa-eye toolbar_icon selected"
								: "fas fa-eye toolbar_icon"
							}>
						1
					</i>
					<i
						onClick={() => handleMenuClick("nose")}
						className=
							{menuState.category === "nose"
								? "fas fa-eye toolbar_icon selected"
								: "fas fa-eye toolbar_icon"
							}>
						1
					</i>
					<i
						onClick={() => handleMenuClick("lips")}
						className=
							{menuState.category === "lips"
								? "fas fa-eye toolbar_icon selected"
								: "fas fa-eye toolbar_icon"
							}>
						1
					</i>
					<i
						onClick={() => handleMenuClick("beard")}
						className=
							{menuState.category === "beard"
								? "fas fa-eye toolbar_icon selected"
								: "fas fa-eye toolbar_icon"
							}>
						1
					</i>
					<i
						onClick={() => handleMenuClick("accessories")}
						className=
							{menuState.category === "accessories"
								? "fas fa-eye toolbar_icon selected"
								: "fas fa-eye toolbar_icon"
							}>
						1
					</i>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		menuState: state.editorMenu.avatarMenu
	}
}

export default connect(mapStateToProps, null)(EditorMenuToolbar)
