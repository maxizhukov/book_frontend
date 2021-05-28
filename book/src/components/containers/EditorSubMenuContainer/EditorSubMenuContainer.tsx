import React, {useState} from "react"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect, useDispatch} from "react-redux"
import {useTranslation} from "react-i18next"
import "./EditorSubMenuContainer.css"
import {handleAvatarMenu} from "../../../redux/actions/editorMenuActions"
import {changeAvatar} from "../../../redux/actions/avatarsActions"
import {isMobile} from "react-device-detect"

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
	// Pick eyes color
	const pickEyesColor = (name:string) => {
		const avatarsCopy = [...avatars]
		avatarsCopy[0].eyesColor = name
		let newEyesImage:string = ""
		categories.eyes.items.forEach((item:any) => {
			if (item.name === avatars[0].eyesName) {
				item.types.forEach((type:any) => {
					if (type.name === avatars[0].eyesColor) {
						newEyesImage = type.img
					}
				})
			}
		})
		avatarsCopy[0].eyes = `http://localhost:5000/${newEyesImage}`
		dispatch(changeAvatar(avatarsCopy))
	}
	// Pick eyebrows color
	const pickEyebrowsColor = (name:string) => {
		const avatarsCopy = [...avatars]
		avatarsCopy[0].eyebrowsColor = name
		let newEyesImage:string = ""
		categories.eyebrows.items.forEach((item:any) => {
			if (item.name === avatars[0].eyebrowsName) {
				item.types.forEach((type:any) => {
					if (type.name === avatars[0].eyebrowsColor) {
						newEyesImage = type.img
					}
				})
			}
		})
		avatarsCopy[0].eyebrows = `http://localhost:5000/${newEyesImage}`
		dispatch(changeAvatar(avatarsCopy))
	}
	// Pick eyebrows color
	const pickLipsColor = (name:string) => {
		const avatarsCopy = [...avatars]
		avatarsCopy[0].lipsColor = name
		let newLipsImage:string = ""
		categories.lips.items.forEach((item:any) => {
			if (item.name === avatars[0].lipsName) {
				item.types.forEach((type:any) => {
					if (type.name === avatars[0].lipsColor) {
						newLipsImage = type.img
					}
				})
			}
		})
		avatarsCopy[0].lips = `http://localhost:5000/${newLipsImage}`
		dispatch(changeAvatar(avatarsCopy))
	}

	// Array of skin colors
	const skinColors = ["#F5E6CF", "#F7CB93", "#BB9260", "#4D3015"]
	// Array of eyes colors
	const eyesColors = [
		"#8082A4", "#655EA7", "#6B6C6C", "#1D1D3E", "#33BAC4",
		"#26A551", "#2A5238", "#B2991A", "#262315", "#141412"
	]
	// Array of eyes colors
	const eyebrowsColors = [
		"#030405", "#635848", "#563718", "#525250", "#C6B659",
		"#DCD39E", "#DC5A11"
	]
	// Array of eyes colors
	const lipsColors = [
		"#F198B5", "#D17194", "#EA4E8F", "#E72581"
	]

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
							key={key}
							className={avatars[0].skinName === (+key + 1).toString()
								? "color_dot_container mr-10 selected"
								: "color_dot_container mr-10"
							}
							onClick={() => pickFaceColor((+key + 1).toString())}
						>
							<div
								className="color_dot"
								style={{backgroundColor: skinColors[key]}}
							/>
						</div>
					))}
				</div>
				: null
			}
			{menuState.category === "eyes"
				?
				<div className={isMobile ? "toolbar_scroll_mobile" : "toolbar_scroll"}>
					<div className="editor_sub_menu_container">
						{Array.from(Array(10).keys()).map((key:number) => (
							<div
								style={{marginTop: "20px"}}
								key={key}
								className={avatars[0].eyesColor === (+key + 1).toString()
									? "color_dot_container mr-10 selected"
									: "color_dot_container mr-10"
								}
								onClick={() => pickEyesColor((+key + 1).toString())}
							>
								<div
									className="color_dot"
									style={{backgroundColor: eyesColors[key]}}
								/>
							</div>
						))}
					</div>
				</div>
				: null
			}
			{menuState.category === "eyebrows"
				?
				<div className={isMobile ? "toolbar_scroll_mobile" : "toolbar_scroll"}>
					<div className="editor_sub_menu_container">
						{Array.from(Array(7).keys()).map((key:number) => (
							<div
								style={{marginTop: "20px"}}
								key={key}
								className={avatars[0].eyebrowsColor === (+key + 1).toString()
									? "color_dot_container mr-10 selected"
									: "color_dot_container mr-10"
								}
								onClick={() => pickEyebrowsColor((+key + 1).toString())}
							>
								<div
									className="color_dot"
									style={{backgroundColor: eyebrowsColors[key]}}
								/>
							</div>
						))}
					</div>
				</div>
				: null
			}
			{menuState.category === "lips"
				?
				<div className={isMobile ? "toolbar_scroll_mobile" : "toolbar_scroll"}>
					<div className="editor_sub_menu_container">
						{Array.from(Array(4).keys()).map((key:number) => (
							<div
								style={{marginTop: "20px"}}
								key={key}
								className={avatars[0].lipsColor === (+key + 1).toString()
									? "color_dot_container mr-10 selected"
									: "color_dot_container mr-10"
								}
								onClick={() => pickLipsColor((+key + 1).toString())}
							>
								<div
									className="color_dot"
									style={{backgroundColor: lipsColors[key]}}
								/>
							</div>
						))}
					</div>
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
