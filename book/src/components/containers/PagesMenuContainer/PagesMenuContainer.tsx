import React, {useEffect, useState} from "react"
import "./PagesMenuContainer.css"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect, useDispatch} from "react-redux"
import {getPages} from "../../../redux/actions/categoriesActions"
import EditorListItem from "../EditorListItem/EditorListItem"
import {changePages} from "../../../redux/actions/pagesActions"

interface CustomProps {
	menu?: any,
	categories?: any,
	pages?: any,
	avatars?: any
}

function PagesMenuContainer({menu, categories, pages, avatars}:CustomProps) {
	const dispatch = useDispatch()

	// Define current posts
	const [currentPosts, setCurrentPosts] = useState([])

	// current page
	const [currentPage, setCurrentPage] = useState("")

	// Take page from url and save to state
	useEffect(() => {
		setCurrentPage(window.location.pathname.slice(14, window.location.pathname.length))
	}, [])

	useEffect(() => {
		if (menu.chosenCategory === "background") {
			if (menu.chosenSubCategory === "image" || menu.chosenSubCategory == "cover") {
				const genderOne = avatars[0].avatarGender === "male" ? "m" : "w"
				const genderTwo = avatars[1].avatarGender === "male" ? "m" : "w"
				const skinOne = `s${avatars[0].skinName}`
				const skinTwo = `s${avatars[1].skinName}`
				const personOne = `${genderOne}${skinOne}`
				const personTwo = `${genderTwo}${skinTwo}`
				if (menu.chosenSubCategory === "image") {
					dispatch(getPages("img", personOne, personTwo))
				} else if (menu.chosenSubCategory === "cover") {
					dispatch(getPages("cover", personOne, personTwo))
				}
			} else {
				dispatch(getPages("img"))
			}
		}
		// eslint-disable-next-line
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
				pageObj.name = page.name
				pageObj.preview = page.types[0].preview
				temporaryArray.push(pageObj)
			})
			setCurrentPosts(temporaryArray)
		}
	}, [menu, categories])

	// Set chosen data
	useEffect(() => {
		setChosenItem(pages.pages[+currentPage].background)
		// eslint-disable-next-line
	}, [menu, pages])

	// set name of chosen item
	const [chosenItem, setChosenItem] = useState("")

	// handle list item click
	const handleItemClick = (name:string, img:string) => {
		setChosenItem(name)
		const pagesCopy = [...pages.pages]
		pagesCopy[+currentPage].background = img
		pagesCopy[+currentPage].backgroundName = name
		categories.pages.items.forEach((post:any) => {
			if (post.name === name) {
				pagesCopy[+currentPage].pageItem = post
			}
		})
		dispatch(changePages(pagesCopy))
		/*const avatarsCopy = [...pages]
		if (menu.chosenSubCategory === "image") {
			avatarsCopy[avatarIndex].faceOval = img
			avatarsCopy[avatarIndex].faceName = name
		}*/
		/*
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
		pages: state.pages,
		avatars: state.avatars.avatars
	}
}

export default connect(mapStateToProps, null)(PagesMenuContainer)
