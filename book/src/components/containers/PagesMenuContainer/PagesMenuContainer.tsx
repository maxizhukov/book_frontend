import React, {useEffect, useRef, useState} from "react"
import "./PagesMenuContainer.css"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect, useDispatch} from "react-redux"
import {getPages} from "../../../redux/actions/categoriesActions"
import EditorListItem from "../EditorListItem/EditorListItem"
import {changePages} from "../../../redux/actions/pagesActions"
import {getCookie} from "../../../utils/cookie"
import {changeAvatar} from "../../../redux/actions/avatarsActions"
import {useLocation} from "react-router"

interface CustomProps {
	menu?: any,
	categories?: any,
	pages?: any,
	avatars?: any,
	avatarsLoading?: boolean,
	pagesImagesLoading?: boolean,
	showBackgroundChangeLoading: () => void
}

function PagesMenuContainer({
	menu,
	categories,
	pages,
	avatars,
	avatarsLoading,
	pagesImagesLoading,
	showBackgroundChangeLoading
}:CustomProps) {
	const dispatch = useDispatch()
	const location = useLocation()

	const url = "http://localhost:5000/"

	// Define current posts
	const [currentPosts, setCurrentPosts] = useState([])

	// current page
	const [currentPage, setCurrentPage] = useState("")

	// Take page from url and save to state
	useEffect(() => {
		setCurrentPage(window.location.pathname.slice(14, window.location.pathname.length))
	}, [location])

	useEffect(() => {
		if (menu.chosenCategory === "background" && !avatarsLoading) {
			if (
				menu.chosenSubCategory === "image"
				|| menu.chosenSubCategory === "cover"
				|| menu.chosenSubCategory === "text"
			) {
				const genderOne = avatars[0].avatarGender === "male" ? "m" : "w"
				const genderTwo = avatars[1].avatarGender === "male" ? "m" : "w"
				const skinOne = `s${avatars[0].skinName}`
				const skinTwo = `s${avatars[1].skinName}`
				const personOne = `${genderOne}${skinOne}`
				const personTwo = `${genderTwo}${skinTwo}`
				console.log(menu.chosenSubCategory)
				if (menu.chosenSubCategory === "image") {
					dispatch(getPages("img", personOne, personTwo))
				} else if (menu.chosenSubCategory === "cover") {
					dispatch(getPages("cover", personOne, personTwo))
				} else if (menu.chosenSubCategory === "text") {
					dispatch(getPages("text", personOne, personTwo))
				}
			}
		}
		// eslint-disable-next-line
	}, [dispatch, avatarsLoading, menu])

	useEffect(() => {
		if (categories.pages.items
			&& categories.pages.items.length
			&& !pages.pages[currentPage]?.background) {
			setChosenItem(categories.pages.items[0].name)
			const pagesCopy = [...pages.pages]
			pagesCopy[+currentPage].background = `${url}${categories.pages.items[0].types[0].img}`
			pagesCopy[+currentPage].backgroundName = categories.pages.items[0].name
			categories.pages.items.forEach((post:any) => {
				if (post.name === categories.pages.items[0].name) {
					pagesCopy[+currentPage].pageItem = post
				}
			})
			dispatch(changePages(pagesCopy))
		}
		// eslint-disable-next-line
	}, [categories.pages])

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
		if (+currentPage !== undefined) {
			setChosenItem(pages.pages[+currentPage].background)
		}

		// eslint-disable-next-line
	}, [menu, pages])

	// set name of chosen item
	const [chosenItem, setChosenItem] = useState("")

	// handle list item click
	const handleItemClick = (name:string, img:string) => {
		showBackgroundChangeLoading()
		// type: 0 => images | type: 1 => text
		const type = menu.chosenSubCategory === "text" ? "1" : "0"
		setChosenItem(name)
		const pagesCopy = [...pages.pages]
		pagesCopy[+currentPage].background = img
		pagesCopy[+currentPage].backgroundName = name
		categories.pages.items.forEach((post:any) => {
			if (post.name === name) {
				pagesCopy[+currentPage].pageItem = post
				pagesCopy[+currentPage].backgroundType = type
			}
		})
		dispatch(changePages(pagesCopy))
	}

	const createUniqueId = (name:any) => {
		return `${name}${Math.random().toString()}`
	}

	// Show loading, till items are not loaded
	const [imagesLoading, setImagesLoading] = useState(true)

	const counter = useRef(0)
	const imageLoaded = () => {
		counter.current += 1
		if (counter.current >= currentPosts.length) {
			setImagesLoading(false)
		}
	}

	return(
		<div
			className="pages_menu_container"
			style={pagesImagesLoading ? {pointerEvents: "none"} : {}}
		>
			{categories.loading
				? <p>Loading</p>
				: currentPosts.map((item:any) => (
					<React.Fragment key={createUniqueId(item.name)}>
						<EditorListItem
							item={item}
							preview={true}
							chosenItem={`http://localhost:5000/${item.img}` === chosenItem}
							handleItemClick={handleItemClick}
							imageLoaded={imageLoaded}
							loading={imagesLoading}
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
		avatars: state.avatars.avatars,
		avatarsLoading: state.avatars.loading,
		pagesImagesLoading: state.serverBook.loading
	}
}

export default connect(mapStateToProps, null)(PagesMenuContainer)
