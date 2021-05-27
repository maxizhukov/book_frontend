import React, {useEffect, useState} from "react"
import "./EditorMenuList.css"
import EditorListItem from "../EditorListItem/EditorListItem"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect, useDispatch} from "react-redux"
import {
	getFacesOval,
	getHair
} from "../../../redux/actions/categoriesActions"
import {changeAvatar} from "../../../redux/actions/avatarsActions"

interface CustomProps {
	categories?: any,
	menuState?: any,
	avatars?: any
}

function EditorMenList({categories, menuState, avatars}:CustomProps) {
	const dispatch = useDispatch()

	// define array of posts
	const [currentPosts, setCurrentPosts] = useState([])

	/*getHair*/
	
	// dispatch data
	useEffect(() => {
		if (menuState) {
			switch (menuState.chosenSubCategory) {
			case "editor.menu.faceOval":
				dispatch(getFacesOval())
				break
			case "editor.menu.hair_short":
				dispatch(getHair())
				break
			case "editor.menu.hair_middle":
				dispatch(getHair())
				break
			case "editor.menu.hair_long":
				dispatch(getHair())
				break
			}
		}
	}, [menuState])

	// Set chosen data
	useEffect(() => {
		if (menuState.chosenSubCategory === "editor.menu.faceOval") {
			setChosenItem(avatars[0].faceOval)
		}
		if ( menuState.chosenSubCategory === "editor.menu.hair_middle") {
			setChosenItem(avatars[0].hair)
		}
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
					if (avatars[0].skinName) {
						if (avatars[0].skinName === item.name) {
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
			menuState.chosenSubCategory === "editor.menu.hair_middle"
		) {
			if (categories.hair.items) {
				const temporaryArray:any = []
				categories.hair.items.forEach((face:any) => {
					const hairObj:any = {
						name: "",
						img: ""
					}
					face.types.forEach((item:any) => {
						if (avatars[0].hairColor === item.name) {
							hairObj.img = item.img
						}
					})
					hairObj.name = face.name
					temporaryArray.push(hairObj)
				})
				setCurrentPosts(temporaryArray)
			}
		} else {
			setCurrentPosts([])
		}
	},[categories, menuState, avatars])

	// set name of chosen item
	const [chosenItem, setChosenItem] = useState("")

	// handle list item click
	const handleItemClick = (name:string, img:string) => {
		setChosenItem(name)
		const avatarsCopy = [...avatars]
		if (menuState.chosenSubCategory === "editor.menu.faceOval") {
			avatarsCopy[0].faceOval = img
			avatarsCopy[0].faceName = name
		}
		if ( menuState.chosenSubCategory === "editor.menu.hair_middle") {
			avatarsCopy[0].hair = img
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
