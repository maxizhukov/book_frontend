import React, {useEffect, useState} from "react"
import "./PagesMenuContainer.css"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect, useDispatch} from "react-redux"
import {getPages} from "../../../redux/actions/categoriesActions"
import EditorListItem from "../EditorListItem/EditorListItem"

interface CustomProps {
	menu?: any,
	categories?: any
}

function PagesMenuContainer({menu, categories}:CustomProps) {
	const dispatch = useDispatch()

	// Define current posts
	const [currentPosts, setCurrentPosts] = useState([])

	useEffect(() => {
		if (menu.chosenCategory === "background") {
			dispatch(getPages())
		}
	}, [dispatch])

	// Click on item
	const handleItemClick = () => {
		console.log("NOW")
	}

	// Get data and set to current post
	useEffect(() => {
		if (menu.chosenCategory === "background"
			&& categories.pages.items) {
			const temporaryArray:any = []
			categories.pages.items.forEach((page:any) => {
				const pageObj:any = {
					name: "",
					img: ""
				}
				console.log(page)
				pageObj.img = page.types[0].img
				pageObj.name = page.types[0].name
				temporaryArray.push(pageObj)
			})
			setCurrentPosts(temporaryArray)
		}
	}, [menu, categories])

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
							chosenItem={`http://localhost:5000/${item.img}` === "chosenItem"}
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
		categories: state.categories
	}
}

export default connect(mapStateToProps, null)(PagesMenuContainer)
