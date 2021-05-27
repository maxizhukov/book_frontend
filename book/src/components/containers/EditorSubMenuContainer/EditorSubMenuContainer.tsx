import React, {useState} from "react"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect, useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"
import "./EditorSubMenuContainer.css"
import {handleAvatarMenu} from "../../../redux/actions/editorMenuActions"
import {changeAvatar} from "../../../redux/actions/avatarsActions"

interface CustomProps {
	menuState?: any,
	avatars?: any,
	categories?: any
}

function EditorSubMenuContainer({menuState, avatars, categories}:CustomProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()

	const handleItemClick = (category:string) => {
		dispatch(handleAvatarMenu(menuState.category, menuState.subCategories, category))
	}

	// Pick face color
	const pickFaceColor = (name:string) => {
		const avatarsCopy = [...avatars]
		avatarsCopy[0].skinName = name
		let newFaceImage:string = ""
		categories.facesOval.items.forEach((item:any) => {
			if (item.name === avatars[0].faceName) {
				item.types.forEach((type:any) => {
					if (type.name === avatars[0].skinName) {
						newFaceImage = type.img
					}
				})
			}
		})
		avatarsCopy[0].faceOval = `http://localhost:5000/${newFaceImage}`
		dispatch(changeAvatar(avatarsCopy))
	}
	// Array of skin colors
	const skinColors = ["#F5E6CF", "#F7CB93", "#BB9260", "#4D3015"]

	return(
		<>
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
			{menuState.category === "face_oval"
				?
				<div className="editor_sub_menu_container">
					{Array.from(Array(4).keys()).map((key:number) => (
						<div
							className={avatars[0].skinName === (+key + 1).toString()
								? "color_dot_container mr-10 selected"
								: "color_dot_container mr-10"
							}
							onClick={() => pickFaceColor((+key + 1).toString())}
						>
							<div className="color_dot" style={{backgroundColor: skinColors[key]}} />
						</div>
					))}
				</div>
				: null
			}
		</>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		menuState: state.editorMenu.avatarMenu,
		avatars: state.avatars.avatars,
		categories: state.categories
	}
}

export default connect(mapStateToProps, null)(EditorSubMenuContainer)
