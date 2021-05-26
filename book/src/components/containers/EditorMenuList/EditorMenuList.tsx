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
			case "editor.menu.skins":
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
		if (menuState.chosenSubCategory === "editor.menu.skins") {
			setChosenItem(avatars[0].faceSkin)
		}
		if (
			menuState.chosenSubCategory === "editor.menu.hair_short" ||
			menuState.chosenSubCategory === "editor.menu.hair_middle" ||
			menuState.chosenSubCategory === "editor.menu.hair_long"
		) {
			setChosenItem(avatars[0].hair)
		}
	}, [menuState, avatars])

	// set data to current post
	useEffect(() => {
		if (menuState.chosenSubCategory === "editor.menu.skins" && categories.facesOval.items) {
			setCurrentPosts(categories.facesOval.items[0].types)
		} else if (
			menuState.chosenSubCategory === "editor.menu.hair_short"
			|| menuState.chosenSubCategory === "editor.menu.hair_middle"
			|| menuState.chosenSubCategory === "editor.menu.hair_long"
		) {
			if (categories.hair.items) {
				setCurrentPosts(categories.hair.items[0].types)
			}
		} else {
			setCurrentPosts([])
		}
	},[categories, menuState])

	// set name of chosen item
	const [chosenItem, setChosenItem] = useState("")

	// handle list item click
	const handleItemClick = (name:string, img:string) => {
		setChosenItem(name)
		const avatarsCopy = [...avatars]
		if (menuState.chosenSubCategory === "editor.menu.skins") {
			avatarsCopy[0].faceSkin = img
		}
		if (menuState.chosenSubCategory === "editor.menu.hair_short"
			|| menuState.chosenSubCategory === "editor.menu.hair_middle"
			|| menuState.chosenSubCategory === "editor.menu.hair_long") {
			avatarsCopy[0].hair = img
		}
		dispatch(changeAvatar(avatarsCopy))
	}

	return(
		<div className="editor_items_list">
			{categories.loading
				? <p>Loading</p>
				: currentPosts.map((item:any) => (
					<React.Fragment key={item.name}>
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
