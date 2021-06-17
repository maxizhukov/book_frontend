import React from "react"
import "./EditorListItem.css"
import {RootState} from "../../../redux/reducers/rootReducer"
import {connect} from "react-redux"

interface CustomProps {
	item: any,
	chosenItem: boolean,
	menuState?: any,
	handleItemClick: (name:string, img:string, secondImage?:string) => void,
	preview?: boolean
}

function EditorListItem({item, chosenItem, menuState,
										   handleItemClick, preview}:CustomProps) {
	const url = "http://localhost:5000/"
	const image = preview ? `${url}${item.preview}` : `${url}${item.img}`

	return(
		<div
			onClick={() =>
				handleItemClick(
					item.name,
					preview ? `${url}${item.img}` : image,
					menuState.category === "hair" ? `${url}${item.secondImage}` : ""
				)}
			className={chosenItem ? "editor_list_item selected" : "editor_list_item"}
			style={{backgroundImage: `url("${image}")`}}
		>
			{chosenItem
				?
				<div className="checked_dot">
					<i className="fas fa-check" />
				</div>
				: null}
		</div>
	)
};

const mapStateToProps = (state:RootState) => {
	return {
		menuState: state.editorMenu.avatarMenu
	}
}

export default connect(mapStateToProps, null)(EditorListItem)
