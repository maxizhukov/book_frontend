import React, {useEffect, useState} from "react"
import "./EditorMenuList.css"
import EditorListItem from "../EditorListItem/EditorListItem"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect, useDispatch} from "react-redux"
import {
	getEyebrows,
	getEyes,
	getFacesOval,
	getHair,
	getLips,
	getNoses
} from "../../../redux/actions/categoriesActions"
import {changeAvatar} from "../../../redux/actions/avatarsActions"

interface CustomProps {
	categories?: any,
	menuState?: any,
	avatars?: any
}

function EditorMenList({categories, menuState, avatars}:CustomProps) {
	const dispatch = useDispatch()
	const avatarIndex:any = +window.location.search.slice(1,2)

	// define array of posts
	const [currentPosts, setCurrentPosts] = useState([])

	// Dispatch if not sub category defined
	const dispatchByCategory = (state: any) => {
		switch (menuState.category) {
		case "eyes":
			dispatch(getEyes())
			break
		case "eyebrows":
			dispatch(getEyebrows())
			break
		case "lips":
			dispatch(getLips())
			break
		case "nose":
			dispatch(getNoses())
			break
		case "hair":
			dispatch(getHair())
			break
		}
	}
	
	// dispatch data
	useEffect(() => {
		if (menuState) {
			switch (menuState.chosenSubCategory) {
			case "editor.menu.faceOval":
				dispatch(getFacesOval())
				break
			default: dispatchByCategory(menuState)
			}
		}
		// eslint-disable-next-line
	}, [menuState])

	// Set chosen data
	useEffect(() => {
		if (menuState.chosenSubCategory === "editor.menu.faceOval") {
			setChosenItem(avatars[avatarIndex].faceOval)
		}
		if ( menuState.category === "hair") {
			setChosenItem(avatars[avatarIndex].hair)
		}
		if (menuState.category === "eyes") {
			setChosenItem(avatars[avatarIndex].eyes)
		}
		if (menuState.category === "eyebrows") {
			setChosenItem(avatars[avatarIndex].eyebrows)
		}
		if (menuState.category === "lips") {
			setChosenItem(avatars[avatarIndex].lips)
		}
		if (menuState.category === "nose") {
			setChosenItem(avatars[avatarIndex].nose)
		}
		// eslint-disable-next-line
	}, [menuState, avatars])

	// set data to current post
	useEffect(() => {
		if (menuState.chosenSubCategory === "editor.menu.faceOval"
			&& categories.facesOval.items) {
			const temporaryArray:any = []
			categories.facesOval.items.forEach((face:any) => {
				const faceObj:any = {
					name: "",
					img: ""
				}
				face.types.forEach((item:any) => {
					if (avatars[avatarIndex].skinName) {
						if (avatars[avatarIndex].skinName === item.name) {
							faceObj.img = item.img
						}
					} else {
						faceObj.img = item.img
					}
				})
				faceObj.name = face.name
				temporaryArray.push(faceObj)
			})
			setCurrentPosts(temporaryArray)
		} else if (
			menuState.category === "hair"
		) {
			if (categories.hair.items) {
				const temporaryArray:any = []
				categories.hair.items.forEach((hair:any) => {
					const hairObj:any = {
						name: "",
						img: "",
						secondImage: ""
					}
					hair.types.forEach((item:any) => {
						if (avatars[avatarIndex].hairColor) {
							if (avatars[avatarIndex].hairColor === item.name) {
								hairObj.img = item.img
								hairObj.secondImage = item.imgBack
							}
						} else {
							hairObj.img = item.img
							hairObj.secondImage = item.imgBack
						}
					})
					hairObj.name = hair.name
					temporaryArray.push(hairObj)
				})
				setCurrentPosts(temporaryArray)
			}
		} else if (
			menuState.category === "eyes"
		) {
			if (categories.eyes.items) {
				const temporaryArray:any = []
				categories.eyes.items.forEach((eyes:any) => {
					const eyesObj:any = {
						name: "",
						img: ""
					}
					eyes.types.forEach((item:any) => {
						if (avatars[avatarIndex].eyesColor) {
							if (avatars[avatarIndex].eyesColor === item.name) {
								eyesObj.img = item.img
							}
						} else {
							eyesObj.img = item.img
						}
					})
					eyesObj.name = eyes.name
					temporaryArray.push(eyesObj)
				})
				setCurrentPosts(temporaryArray)
			}
		} else if (
			menuState.category === "eyebrows"
		) {
			if (categories.eyebrows.items) {
				const temporaryArray:any = []
				categories.eyebrows.items.forEach((eyebrows:any) => {
					const eyebrowsObj:any = {
						name: "",
						img: ""
					}
					eyebrows.types.forEach((item:any) => {
						if (avatars[avatarIndex].eyebrowsColor) {
							if (avatars[avatarIndex].eyebrowsColor === item.name) {
								eyebrowsObj.img = item.img
							}
						} else {
							eyebrowsObj.img = item.img
						}
					})
					eyebrowsObj.name = eyebrows.name
					temporaryArray.push(eyebrowsObj)
				})
				setCurrentPosts(temporaryArray)
			}
		} else if (
			menuState.category === "lips"
		) {
			if (categories.lips.items) {
				const temporaryArray:any = []
				categories.lips.items.forEach((lips:any) => {
					const lipsObj:any = {
						name: "",
						img: ""
					}
					lips.types.forEach((item:any) => {
						if (avatars[avatarIndex].lipsColor) {
							if (avatars[avatarIndex].lipsColor === item.name) {
								lipsObj.img = item.img
							}
						} else {
							lipsObj.img = item.img
						}
					})
					lipsObj.name = lips.name
					temporaryArray.push(lipsObj)
				})
				setCurrentPosts(temporaryArray)
			}
		} else if (
			menuState.category === "nose"
		) {
			if (categories.nose.items) {
				const temporaryArray:any = []
				categories.nose.items.forEach((nose:any) => {
					const noseObj:any = {
						name: "",
						img: ""
					}
					nose.types.forEach((item:any) => {
						noseObj.img = item.img
					})
					noseObj.name = nose.name
					temporaryArray.push(noseObj)
				})
				setCurrentPosts(temporaryArray)
			}
		} else {
			setCurrentPosts([])
		}
		// eslint-disable-next-line
	},[categories, menuState, avatars])

	// set name of chosen item
	const [chosenItem, setChosenItem] = useState("")

	// handle list item click
	const handleItemClick = (name:string, img:string, secondImage?: string) => {
		setChosenItem(name)
		const avatarsCopy = [...avatars]
		if (menuState.chosenSubCategory === "editor.menu.faceOval") {
			avatarsCopy[avatarIndex].faceOval = img
			avatarsCopy[avatarIndex].faceName = name
		}
		if ( menuState.category === "hair") {
			avatarsCopy[avatarIndex].hair = img
			avatarsCopy[avatarIndex].hairName = name
			avatarsCopy[avatarIndex].hairBack = secondImage
		}
		if ( menuState.category === "eyes") {
			avatarsCopy[avatarIndex].eyes = img
			avatarsCopy[avatarIndex].eyesName = name
		}
		if ( menuState.category === "eyebrows") {
			avatarsCopy[avatarIndex].eyebrows = img
			avatarsCopy[avatarIndex].eyebrowsName = name
		}
		if ( menuState.category === "lips") {
			avatarsCopy[avatarIndex].lips = img
			avatarsCopy[avatarIndex].lipsName = name
		}
		if ( menuState.category === "nose") {
			avatarsCopy[avatarIndex].nose = img
			avatarsCopy[avatarIndex].noseName = name
		}
		dispatch(changeAvatar(avatarsCopy))
	}

	const createUniqueId = (name:any) => {
		return `${name}${Math.random().toString()}`
	}

	return(
		<div className="editor_items_list">
			{categories.loading
				? <p>Loading</p>
				: currentPosts.map((item:any) => (
					<React.Fragment key={createUniqueId(item.name)}>
						<EditorListItem
							item={item}
							chosenItem={`http://localhost:5000/${item.img}` === chosenItem}
							handleItemClick={handleItemClick}
						/>
					</React.Fragment>
				))
			}
		</div>
	)
}

const mapStateToProps = (state:RootState) => {
	return {
		categories: state.categories,
		menuState: state.editorMenu.avatarMenu,
		avatars: state.avatars.avatars
	}
}

export default connect(mapStateToProps, null)(EditorMenList)
