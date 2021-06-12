import React, {useEffect, useState} from "react"
import "./PagesMenuContainer.css"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect, useDispatch} from "react-redux"
import {getPages} from "../../../redux/actions/categoriesActions"
import EditorListItem from "../EditorListItem/EditorListItem"

interface CustomProps {
	menu?: any,
	categories?: any,
	pages?: any
}

function PagesMenuContainer({menu, categories, pages}:CustomProps) {
	const dispatch = useDispatch()

	// Define current posts
	const [currentPosts, setCurrentPosts] = useState([])

	useEffect(() => {
		if (menu.chosenCategory === "background") {
			dispatch(getPages())
		}
	}, [dispatch])

	// Get data and set to current post
	useEffect(() => {
		if (menu.chosenCategory === "background"
			&& categories.pages.items) {
			const temporaryArray:any = []
			categories.pages.items.forEach((page:any) => {
				const pageObj:any = {
					name: "",
					img: "",
					preview: ""
				}
				pageObj.img = page.types[0].img
				pageObj.name = page.types[0].name
				pageObj.preview = page.types[0].preview
				temporaryArray.push(pageObj)
			})
			setCurrentPosts(temporaryArray)
		}
	}, [menu, categories])

	// Set chosen data
	useEffect(() => {
		/*if (menuState.chosenSubCategory === "editor.menu.faceOval") {
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
		}*/
	}, [menu, pages])

	// set name of chosen item
	const [chosenItem, setChosenItem] = useState("")

	// handle list item click
	const handleItemClick = (name:string, img:string) => {
		setChosenItem(name)
		console.log(img)
		/*const avatarsCopy = [...avatars]
		if (menuState.chosenSubCategory === "editor.menu.faceOval") {
			avatarsCopy[avatarIndex].faceOval = img
			avatarsCopy[avatarIndex].faceName = name
		}*/
		/*if ( menuState.category === "hair") {
			avatarsCopy[avatarIndex].hair = img
			avatarsCopy[avatarIndex].hairName = name
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
		dispatch(changeAvatar(avatarsCopy))*/
	}

	console.log("chosen Item", chosenItem)

	const createUniqueId = (name:any) => {
		return `${name}${Math.random().toString()}`
	}

	return(
		<div className="pages_menu_container">
			{categories.loading
				? <p>Loading</p>
				: currentPosts.map((item:any) => (
					<React.Fragment key={createUniqueId(item.name)}>
						<EditorListItem
							item={item}
							preview={true}
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
		menu: state.editorMenu.pagesMenu,
		categories: state.categories,
		pages: state.pages
	}
}

export default connect(mapStateToProps, null)(PagesMenuContainer)
