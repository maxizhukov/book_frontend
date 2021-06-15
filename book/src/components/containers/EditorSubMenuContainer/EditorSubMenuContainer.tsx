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
	const avatarIndex:any = +window.location.search.slice(1,2)

	const handleItemClick = (category:string) => {
		dispatch(handleAvatarMenu(menuState.category, menuState.subCategories, category))
	}

	// Pick face color
	const pickFaceColor = (name:string) => {
		const avatarsCopy = [...avatars]
		avatarsCopy[avatarIndex].skinName = name
		let newFaceImage:string = ""
		categories.facesOval.items.forEach((item:any) => {
			if (item.name === avatars[avatarIndex].faceName) {
				item.types.forEach((type:any) => {
					if (type.name === avatars[avatarIndex].skinName) {
						newFaceImage = type.img
					}
				})
			}
		})
		avatarsCopy[avatarIndex].faceOval = `http://localhost:5000/${newFaceImage}`
		dispatch(changeAvatar(avatarsCopy))
	}
	// Pick eyes color
	const pickEyesColor = (name:string) => {
		const avatarsCopy = [...avatars]
		avatarsCopy[avatarIndex].eyesColor = name
		let newEyesImage:string = ""
		categories.eyes.items.forEach((item:any) => {
			if (item.name === avatars[avatarIndex].eyesName) {
				item.types.forEach((type:any) => {
					if (type.name === avatars[avatarIndex].eyesColor) {
						newEyesImage = type.img
					}
				})
			}
		})
		avatarsCopy[avatarIndex].eyes = `http://localhost:5000/${newEyesImage}`
		dispatch(changeAvatar(avatarsCopy))
	}
	// Pick eyebrows color
	const pickEyebrowsColor = (name:string) => {
		const avatarsCopy = [...avatars]
		avatarsCopy[avatarIndex].eyebrowsColor = name
		let newEyesImage:string = ""
		categories.eyebrows.items.forEach((item:any) => {
			if (item.name === avatars[avatarIndex].eyebrowsName) {
				item.types.forEach((type:any) => {
					if (type.name === avatars[avatarIndex].eyebrowsColor) {
						newEyesImage = type.img
					}
				})
			}
		})
		avatarsCopy[avatarIndex].eyebrows = `http://localhost:5000/${newEyesImage}`
		dispatch(changeAvatar(avatarsCopy))
	}
	// Pick eyebrows color
	const pickLipsColor = (name:string) => {
		const avatarsCopy = [...avatars]
		avatarsCopy[avatarIndex].lipsColor = name
		let newLipsImage:string = ""
		categories.lips.items.forEach((item:any) => {
			if (item.name === avatars[avatarIndex].lipsName) {
				item.types.forEach((type:any) => {
					if (type.name === avatars[avatarIndex].lipsColor) {
						newLipsImage = type.img
					}
				})
			}
		})
		avatarsCopy[avatarIndex].lips = `http://localhost:5000/${newLipsImage}`
		dispatch(changeAvatar(avatarsCopy))
	}
	// Pick hair color
	const pickHairColor = (name:string) => {
		const avatarsCopy = [...avatars]
		avatarsCopy[avatarIndex].hairColor = name
		let newHairImage:string = ""
		categories.hair.items.forEach((item:any) => {
			if (item.name === avatars[avatarIndex].hairName) {
				item.types.forEach((type:any) => {
					if (type.name === avatars[avatarIndex].hairColor) {
						newHairImage = type.img
					}
				})
			}
		})
		avatarsCopy[avatarIndex].hair = `http://localhost:5000/${newHairImage}`
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
	// Array of lips colors
	const lipsColors = [
		"#B56733", "#D39393", "#F1C9C9", "#E48D8D",
		"#E49090", "#EB5757", "#CF5258", "#D61A1E",
		"#A94E50", "#552328", "#E72863", "#AD2687",
		"#502E67", "#232323", "#BA1821", "#5E1412"
	]
	// Array of eyes colors
	const hairsColor = [
		"#B3552D", "#C9CD9F", "#C6B658", "#7B7A6C", "#3E2B16",
		"#645949", "#252321"
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
							className={avatars[avatarIndex].skinName === (+key + 1).toString()
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
								className={avatars[avatarIndex].eyesColor === (+key + 1).toString()
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
								className={avatars[avatarIndex].eyebrowsColor
								=== (+key + 1).toString()
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
						{Array.from(Array(16).keys()).map((key:number) => (
							<div
								style={{marginTop: "20px"}}
								key={key}
								className={avatars[avatarIndex].lipsColor === (+key + 1).toString()
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
			{menuState.category === "hair"
				?
				<div className={isMobile ? "toolbar_scroll_mobile" : "toolbar_scroll"}>
					<div className="editor_sub_menu_container">
						{Array.from(Array(7).keys()).map((key:number) => (
							<div
								style={{marginTop: "20px"}}
								key={key}
								className={avatars[avatarIndex].hairColor === (+key + 1).toString()
									? "color_dot_container mr-10 selected"
									: "color_dot_container mr-10"
								}
								onClick={() => pickHairColor((+key + 1).toString())}
							>
								<div
									className="color_dot"
									style={{backgroundColor: hairsColor[key]}}
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
